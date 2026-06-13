import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpen, CheckCircle2, ShieldCheck, Sparkles, X } from 'lucide-react'
import AdmissionFormCard from './AdmissionFormCard'

const AdmissionsModalContext = createContext(null)

export function AdmissionsModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialProgram, setInitialProgram] = useState('')

  const openAdmissionsModal = (program = '') => {
    setInitialProgram(program)
    setIsOpen(true)
  }

  const closeAdmissionsModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const autoOpenTimer = window.setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => {
      window.clearTimeout(autoOpenTimer)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    document.body.style.overflow = isOpen ? 'hidden' : ''

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeAdmissionsModal()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <AdmissionsModalContext.Provider
      value={{ isOpen, initialProgram, openAdmissionsModal, closeAdmissionsModal }}
    >
      {children}
    </AdmissionsModalContext.Provider>
  )
}

export function useAdmissionsModal() {
  const context = useContext(AdmissionsModalContext)

  if (!context) {
    throw new Error('useAdmissionsModal must be used within AdmissionsModalProvider')
  }

  return context
}

export default function AdmissionsModal() {
  const { isOpen, initialProgram, closeAdmissionsModal } = useAdmissionsModal()

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="admissions-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdmissionsModal}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="admissions-modal-title"
            className="admissions-modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="admissions-modal-close"
              onClick={closeAdmissionsModal}
              aria-label="Close admissions form"
            >
              <X size={22} />
            </button>

            <div className="admissions-modal-grid">
              <aside className="admissions-modal-copy">
                <span className="kicker">Apply Now</span>
                <h2 id="admissions-modal-title">Start your admission journey in one step</h2>
                <p>
                  Share your details and our team will guide you through the
                  right program, eligibility, and next steps.
                </p>

                <div className="admissions-modal-highlights">
                  <div>
                    <Sparkles size={18} />
                    <span>Fast counseling support</span>
                  </div>
                  <div>
                    <BookOpen size={18} />
                    <span>Program guidance included</span>
                  </div>
                  <div>
                    <ShieldCheck size={18} />
                    <span>No spam, no pressure</span>
                  </div>
                  <div>
                    <CheckCircle2 size={18} />
                    <span>Scholarship assistance available</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn outline admissions-modal-link"
                  onClick={closeAdmissionsModal}
                >
                  Continue Browsing <ArrowRight />
                </button>
              </aside>

              <div className="admissions-modal-form-shell">
                <AdmissionFormCard compact initialProgram={initialProgram} />
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
