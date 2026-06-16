import { PhoneCall } from 'lucide-react'
import Brand from '../ui/Brand'
import { courseContactOptions } from '../../data/siteData'

const footerLinks = [
  ['Programs', '#programs'],
  ['Admissions', '#admissions'],
  ['Placements', '#placements'],
  ['Campus', '#about'],
  ['Privacy Policy', '#home'],
]

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <Brand />
        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <span>&copy; 2026 GGES Education</span>
      </footer>

      <div className="footer-bottom-strip">
        <div className="footer-contact" aria-label="Phone numbers">
          {courseContactOptions.map((option) => (
            <div key={option.id} className="footer-contact-group">
              <span>{option.subtitle}</span>
              <div>
                {option.numbers.map((number) => (
                  <a key={number} href={`tel:+91${number}`}>
                    <PhoneCall size={15} />
                    +91 {number}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="footer-credit">
          Developed by{' '}
          <a href="https://www.ntechzy.in" target="_blank" rel="noreferrer">
            Ntechzy
          </a>
        </p>
      </div>
    </>
  )
}
