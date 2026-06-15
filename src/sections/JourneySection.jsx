import { motion } from 'framer-motion'
import { ArrowRight, Building2, Target } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { reveal } from '../constants/motion'
import { journeySteps } from '../data/siteData'

export default function JourneySection() {
  return (
    <section className="journey-section dark-section section-pad">
      <SectionHeading
        eyebrow="Your Journey"
        title="From Admission to Career Success"
        description="A structured, industry-aligned pathway designed to transform students into professionals."
        light
      />

      <div className="journey-line">
        {journeySteps.map(({ title, description, icon: Icon }, index) => (
          <motion.article
            key={title}
            className={`journey-step${index === 5 ? ' highlighted' : ''}`}
            {...reveal}
            transition={{ duration: 0.45, delay: index * 0.07 }}
          >
            <div className="journey-icon"><Icon /></div>
            {index < journeySteps.length - 1 && <ArrowRight className="journey-arrow" />}
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
