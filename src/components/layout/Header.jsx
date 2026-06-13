import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigationItems } from '../../data/siteData'
import Brand from '../ui/Brand'
import { useAdmissionsModal } from '../AdmissionsModal'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { openAdmissionsModal } = useAdmissionsModal()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55%' },
    )

    navigationItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <Brand />
      <button
        className="menu-btn"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      <nav className={`nav${isOpen ? ' open' : ''}`} aria-label="Primary navigation">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            className={activeSection === id ? 'active' : ''}
            href={`#${id}`}
            onClick={() => setIsOpen(false)}
          >
            <Icon />
            {label}
          </a>
        ))}
      </nav>
      <button type="button" className="btn primary header-cta" onClick={() => openAdmissionsModal()}>
        Apply Now
      </button>
    </header>
  )
}
