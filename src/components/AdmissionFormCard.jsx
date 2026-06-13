import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { reveal } from '../constants/motion'
import { programs } from '../data/siteData'

export default function AdmissionFormCard({ compact = false, initialProgram = '' }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(initialProgram)

  useEffect(() => {
    setSelectedProgram(initialProgram)
  }, [initialProgram])

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <motion.form
      className={`apply-form${compact ? ' compact' : ''}`}
      onSubmit={handleSubmit}
      {...reveal}
    >
      <h2>{isSubmitted ? 'Thank You!' : "Apply Now - It's Free"}</h2>
      {isSubmitted ? (
        <div className="success-message">
          <Check />
          <h3>Your application has been received.</h3>
          <p>Our admissions team will contact you shortly.</p>
          <button
            type="button"
            className="btn primary"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another
          </button>
        </div>
      ) : (
        <>
          <label className="full">
            Full Name
            <input required name="fullName" autoComplete="name" placeholder="Enter your name" />
          </label>
          <label>
            Phone
            <input required name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
          </label>
          <label>
            Email
            <input required name="email" type="email" autoComplete="email" placeholder="you@email.com" />
          </label>
          <label>
            Program
            <span className="select-wrap">
              <select
                required
                name="program"
                value={selectedProgram}
                onChange={(event) => setSelectedProgram(event.target.value)}
              >
                <option value="" disabled>Select program</option>
                {Object.keys(programs).map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              <ChevronDown />
            </span>
          </label>
          <label>
            State
            <input required name="state" autoComplete="address-level1" placeholder="Your state" />
          </label>
          <label>
            City
            <input required name="city" autoComplete="address-level2" placeholder="Your city" />
          </label>
          <button className="form-submit full" type="submit">
            Start Your Admission Journey <ArrowRight />
          </button>
          <small className="full privacy">By submitting, you agree to our Privacy Policy. No spam, ever.</small>
        </>
      )}
    </motion.form>
  )
}
