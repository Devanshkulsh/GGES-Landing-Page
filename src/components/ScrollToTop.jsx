import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let frameOne = 0
    let frameTwo = 0

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(scrollToTop)
    })

    return () => {
      window.cancelAnimationFrame(frameOne)
      window.cancelAnimationFrame(frameTwo)
    }
  }, [])

  return null
}
