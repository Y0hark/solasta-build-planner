const DEPOT = 'https://github.com/Y0hark/solasta-build-planner'

export default function Footer() {
  return (
    <footer className="border-t border-or-700/25 bg-encre/70">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center">
        <div className="filet mx-auto mb-5 w-24" />
        <p className="font-grimoire text-sm text-gray-400">
          Fabriqué avec <span aria-hidden="true">🪨</span> pour Solasta
        </p>
        <a
          href={DEPOT}
          target="_blank"
          rel="noreferrer"
          className="glyphe mt-4 inline-flex items-center gap-2 transition-colors hover:text-or-100"
        >
          Le dépôt GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  )
}
