import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Bot, ChevronRight, MessageCircle, Sparkles, X } from 'lucide-react'
import { programs } from '../data/siteData'

const topicOptions = [
  'Program overview',
  'Career options',
  'Duration and eligibility',
  'Admission help',
]

const quickActions = ['Explore another program', 'Go to admissions', 'Close chat']

const initialMessages = [
  {
    type: 'bot',
    text: 'Hi, I’m the GGES Program Guide. Pick a course and I’ll help you compare duration, career paths, and next steps.',
  },
]

export default function AdmissionsChatbot() {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState('program')
  const [messages, setMessages] = useState(initialMessages)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [typing, setTyping] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const endRef = useRef(null)
  const replyTimerRef = useRef(null)

  const programKeys = useMemo(() => Object.keys(programs), [])
  const activeProgram = selectedProgram ? programs[selectedProgram] : null

  useEffect(() => {
    const loop = () => {
      const promptTimer = window.setTimeout(() => {
        setShowPrompt(true)
        const hideTimer = window.setTimeout(() => {
          setShowPrompt(false)
          loop()
        }, 3200)

        replyTimerRef.current = hideTimer
      }, 6500)

      replyTimerRef.current = promptTimer
    }

    loop()

    return () => {
      if (replyTimerRef.current) window.clearTimeout(replyTimerRef.current)
    }
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  const handleProgramSelection = (programKey) => {
    if (typing) return

    const program = programs[programKey]
    setSelectedProgram(programKey)
    setStage('topic')
    setMessages([
      ...initialMessages,
      { type: 'user', text: programKey },
      {
        type: 'bot',
        text: `${programKey} is a ${program.title} program with a ${program.duration.toLowerCase()} duration. What would you like to know next?`,
      },
    ])
  }

  const handleTopicSelection = (option) => {
    if (typing || !activeProgram) return

    const nextMessages = [...messages, { type: 'user', text: option }]
    setMessages(nextMessages)
    setTyping(true)

    replyTimerRef.current = window.setTimeout(() => {
      setTyping(false)

      const careerPreview = activeProgram.careers.slice(0, 3).join(', ')
      const replies = {
        'Program overview': `${selectedProgram} combines academic foundations with practical learning. It is designed for students who want a future-ready path into ${activeProgram.title.toLowerCase()}.`,
        'Career options': `${selectedProgram} can lead to roles like ${careerPreview}. The full career list also includes ${activeProgram.careers.slice(3).join(', ')}.`,
        'Duration and eligibility': `${selectedProgram} runs for ${activeProgram.duration}. For the latest eligibility and fee details, our admissions team can guide you through the exact process.`,
        'Admission help': 'You can start your application from the admissions section, or keep chatting here if you want to compare courses first.',
      }

      setMessages((current) => [
        ...current,
        { type: 'bot', text: replies[option] || 'I can help you explore the program or move to admissions whenever you are ready.' },
        { type: 'bot', text: 'Would you like to explore another program or go to admissions?' },
      ])
      setStage('action')
    }, 650)
  }

  const handleAction = (option) => {
    if (typing) return

    setMessages((current) => [...current, { type: 'user', text: option }])

    if (option === 'Explore another program') {
      setSelectedProgram('')
      setStage('program')
      setMessages((current) => [
        ...current,
        { type: 'bot', text: 'Great. Pick another course and I’ll compare it for you.' },
      ])
      return
    }

    if (option === 'Go to admissions') {
      setMessages((current) => [
        ...current,
        { type: 'bot', text: 'Opening the admissions section now.' },
      ])
      scrollToSection('#admissions')
      return
    }

    setOpen(false)
  }

  const currentOptions = stage === 'program' ? programKeys : stage === 'topic' ? topicOptions : quickActions

  return (
    <>
      <div 
        className="chatbot-launcher" 
        // FIX: Reduced right edge spacing slightly to accommodate smaller phone screens
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.25rem', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}
      >
        <AnimatePresence>
          {showPrompt && !open ? (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="chatbot-prompt"
              style={{ backgroundColor: 'var(--primary-color, #10b981)', color: '#fff', padding: '0.75rem 1rem', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '0.875rem' }}
            >
              Ask about courses, careers, or admissions
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setOpen((current) => !current)
            setShowPrompt(false)
          }}
          aria-label={open ? 'Close course assistant' : 'Open course assistant'}
          aria-expanded={open}
          aria-controls="gges-chatbot"
          className="chatbot-fab"
          style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', border: 'none' }}
        >
          <span className="chatbot-fab-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid currentColor', opacity: 0.5 }} />
          <span className="chatbot-fab-core" style={{ position: 'relative', zIndex: 1 }}>{open ? <X size={24} /> : <MessageCircle size={24} />}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.section
            id="gges-chatbot"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="chatbot-panel"
            style={{ 
              position: 'fixed', 
              bottom: '5rem', // Tighter to the button
              right: '1rem', // Tighter to the edge for small screens
              zIndex: 50, 
              // FIX: Use dvw to avoid mobile viewport wobble from browser chrome changes
              width: 'min(380px, calc(100dvw - 2rem))', 
              maxWidth: 'calc(100dvw - 2rem)', 
              height: 'min(600px, calc(100vh - 100px))', 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              borderRadius: '1rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <header className="chatbot-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', flexShrink: 0 }}>
              <div className="chatbot-header-copy" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="chatbot-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%' }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h2 id="chatbot-title" style={{ margin: 0, fontSize: '1rem' }}>GGES Course Assistant</h2>
                  <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Sparkles size={12} />
                    Ready to guide you
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                className="chatbot-close"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.7 }}
              >
                <ChevronRight size={24} />
              </button>
            </header>

            {/* FIX: Ensure the body scrolls properly with flex: '1 1 auto' */}
            <div className="chatbot-body" aria-live="polite" style={{ flex: '1 1 auto', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.type}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chatbot-message ${message.type === 'bot' ? 'bot' : 'user'}`}
                  style={{ 
                    alignSelf: message.type === 'bot' ? 'flex-start' : 'flex-end', 
                    maxWidth: '85%', 
                    wordBreak: 'break-word',
                  }}
                >
                  {message.text}
                </motion.div>
              ))}

              {typing ? (
                <div className="chatbot-typing" aria-label="Assistant is typing" style={{ display: 'flex', gap: '4px', padding: '0.5rem 1rem', alignSelf: 'flex-start' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6 }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6 }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6 }} />
                </div>
              ) : null}
              <div ref={endRef} />
            </div>

            <footer className="chatbot-footer" style={{ padding: '1rem', flexShrink: 0 }}>
              <div className="chatbot-footer-label" style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.75rem' }}>Choose an option</div>
              <div className="chatbot-options" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (stage === 'program') {
                        handleProgramSelection(option)
                        return
                      }

                      if (stage === 'topic') {
                        handleTopicSelection(option)
                        return
                      }

                      handleAction(option)
                    }}
                    className="chatbot-chip"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.35rem', 
                      cursor: 'pointer',
                      // FIX: Allow text to wrap normally inside the button instead of forcing it to stretch the screen horizontally
                      whiteSpace: 'normal',
                      textAlign: 'left'
                    }}
                  >
                    {option}
                    <ArrowRight size={14} style={{ flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </footer>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  )
}
