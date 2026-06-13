import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, PhoneCall } from 'lucide-react'
import Stat from '../components/ui/Stat'
import AdmissionFormCard from '../components/AdmissionFormCard'
import { useAdmissionsModal } from '../components/AdmissionsModal'
import { courseContactOptions } from '../data/siteData'

const benefits = ['Free Counseling', 'Scholarship Available', '95% Placement']
const finalStats = [['10,000+', 'Students'], ['500+', 'Recruiters'], ['95%', 'Placement'], ['20+', 'Years']]

export default function AdmissionsSection() {
  const [isCounselorMenuOpen, setIsCounselorMenuOpen] = useState(false)
  const counselorMenuRef = useRef(null)
  const { openAdmissionsModal } = useAdmissionsModal()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (counselorMenuRef.current && !counselorMenuRef.current.contains(event.target)) {
        setIsCounselorMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsCounselorMenuOpen(false)
      }
    }

    if (isCounselorMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isCounselorMenuOpen])

  return (
    <>
      <section id="admissions" className="admission-section">
        <div className="admission-pitch">
          <div>
            <span className="kicker">Start Your Journey</span>
            <h2>Begin Your<br />Admission Today</h2>
            <p>Join thousands of students who chose GGES for a better future.</p>
            {benefits.map((benefit) => <span className="benefit" key={benefit}><Check />{benefit}</span>)}
            <div className="admission-media">
              <img src="/campus-life.svg" alt="Campus life illustration" />
              <img src="/classroom-lab.svg" alt="Classroom learning illustration" />
            </div>
          </div>
        </div>
        <AdmissionFormCard />
      </section>

      <section id="contact" className="final-cta dark-section">
        <span className="kicker">Your Future Awaits</span>
        <h2>Your Future Starts Here</h2>
        <p>Join thousands of students building successful careers through quality education and industry-ready training.</p>
        <div className="final-cta-actions">
          <button
            type="button"
            className="btn primary final-cta-button"
            onClick={() => openAdmissionsModal()}
          >
            Apply Now
          </button>
          <div ref={counselorMenuRef} className="counselor-menu-shell">
            <button
              type="button"
              className="btn brand-outline final-cta-button"
              onClick={() => setIsCounselorMenuOpen((current) => !current)}
              aria-expanded={isCounselorMenuOpen}
              aria-controls="counselor-menu"
            >
              Talk to Counselor <ChevronDown />
            </button>
            <AnimatePresence>
              {isCounselorMenuOpen && (
                <motion.div
                  id="counselor-menu"
                  className="counselor-menu"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="counselor-menu-title">
                    Choose a course line
                  </p>
                  <div className="counselor-menu-list">
                    {courseContactOptions.map((option) => (
                      <a
                        key={option.id}
                        className="counselor-menu-item"
                        href={`tel:+${option.number}`}
                        onClick={() => setIsCounselorMenuOpen(false)}
                      >
                        <div className="counselor-menu-copy">
                          <strong>{option.label}</strong>
                          <span>{option.subtitle}</span>
                        </div>
                        <PhoneCall size={18} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="final-stats">
          {finalStats.map(([value, label]) => <Stat key={label} value={value} label={label} />)}
        </div>
      </section>
    </>
  )
}
