import { Link } from 'react-router-dom'
import Revelation from './Revelation.jsx'
import { accentDe, variableAccent } from '../lib/accents.js'

export default function BuildCard({ build, index = 0 }) {
  const accent = accentDe(build)

  return (
    <Revelation
      as="article"
      delai={index * 110}
      className="group groupe-plaque"
      style={variableAccent(build)}
    >
      <Link
        to={`/build/${build.id}`}
        className="plaque equerres accent-vif flex h-full flex-col overflow-hidden p-6"
      >
        {/* Lueur d'accent : le sceau chauffe quand on approche */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent.halo} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100`}
        />

        <header className="relative flex items-start gap-4">
          <span aria-hidden="true" className="sceau-carte text-4xl">
            {build.icone}
          </span>
        </header>

        {/* Hauteur réservée pour deux lignes : les trois cartes restent alignées */}
        <h3 className="grave relative mt-5 min-h-[3.25rem] text-lg leading-snug tracking-[0.08em]">
          {build.nom}
        </h3>

        <p className="relative mt-1 font-rune text-[0.7rem] uppercase tracking-[0.18em] text-gray-400">
          {build.classe} · {build.sousClasse}
        </p>

        <div aria-hidden="true" className={`relative mt-4 h-px w-10 ${accent.trait}`} />

        <p className="relative mt-4 text-sm leading-relaxed text-gray-300">{build.resume}</p>

        <ul className="relative mt-5 flex flex-wrap gap-2 pb-2">
          <li
            className={`${build.niveauPuissance === 'Broken' ? 'sceau-brise' : ''} rounded-full border px-2.5 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] ${accent.puce}`}
          >
            {build.niveauPuissance}
          </li>
          <li className="rounded-full border border-gray-600/50 px-2.5 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] text-gray-400">
            {build.difficulte}
          </li>
        </ul>

        <p className="relative mt-auto flex items-center gap-2 pt-6 font-rune text-[0.65rem] uppercase tracking-[0.2em] text-or-500 transition-colors duration-300 group-hover:text-or-100">
          Ouvrir la page
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </p>
      </Link>
    </Revelation>
  )
}
