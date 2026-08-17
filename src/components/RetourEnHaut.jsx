import { useEffect, useState } from 'react'

const SEUIL = 500

/** Sceau de retour : apparaît après 500px de défilement, en fondu + échelle. */
export default function RetourEnHaut() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let image = 0
    const mesurer = () => setVisible(window.scrollY > SEUIL)
    const surScroll = () => {
      cancelAnimationFrame(image)
      image = requestAnimationFrame(mesurer)
    }

    mesurer()
    window.addEventListener('scroll', surScroll, { passive: true })
    return () => {
      cancelAnimationFrame(image)
      window.removeEventListener('scroll', surScroll)
    }
  }, [])

  const remonter = () => {
    const sansAnimation =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: sansAnimation ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={remonter}
      aria-label="Revenir en haut de la page"
      // Retiré du flux de tabulation tant qu'il est invisible
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : 'true'}
      className={`fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-or-500/50 bg-encre/85 font-rune text-or-300 shadow-sceau backdrop-blur-sm transition duration-300 hover:border-or-300 hover:bg-or-500/15 hover:text-or-100 sm:bottom-8 sm:right-8 ${
        visible ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
      }`}
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}
