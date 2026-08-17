import { Link } from 'react-router-dom'
import builds from '../data/builds.js'
import BuildCard from '../components/BuildCard.jsx'
import Revelation from '../components/Revelation.jsx'
import { SYNERGIES } from '../lib/formation.js'

const RUNES = '✦ FOR ✦ DEX ✦ CON ✦ INT ✦ SAG ✦ CHA '

/** Sceau runique du frontispice : deux anneaux qui tournent en sens inverse. */
function SceauRunique() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 animate-respiration sm:h-[42rem] sm:w-[42rem]"
    >
      <svg viewBox="0 0 400 400" className="h-full w-full text-or-500/40">
        <defs>
          <path id="anneau-externe" d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0" />
          <path id="anneau-interne" d="M200,200 m-118,0 a118,118 0 1,0 236,0 a118,118 0 1,0 -236,0" />
        </defs>

        <g className="origin-center animate-rotation-lente">
          <circle cx="200" cy="200" r="188" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <text className="font-rune" fill="currentColor" fontSize="12" letterSpacing="7">
            <textPath href="#anneau-externe">{RUNES.repeat(4)}</textPath>
          </text>
        </g>

        <g className="origin-center animate-rotation-inverse">
          <circle cx="200" cy="200" r="118" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <text className="font-rune" fill="currentColor" fontSize="10" letterSpacing="6">
            <textPath href="#anneau-interne">{RUNES.repeat(3)}</textPath>
          </text>
          {/* Triangle : trois sommets, trois builds */}
          <polygon
            points="200,108 280,248 120,248"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <polygon
            points="200,292 120,152 280,152"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-24 sm:pt-32">
        <SceauRunique />

        <div className="mx-auto max-w-3xl text-center">
          <p className="glyphe animate-encre">Crown of the Magister · Team de 3</p>

          {/* L'entrée et la pulsation sont deux animations : deux éléments. */}
          <div className="animate-montee retard-1 mt-6">
            <h1 className="grave lueur-titre text-3xl leading-[1.15] tracking-[0.12em] sm:text-5xl">
              Solasta Build Planner
            </h1>
          </div>

          <div className="filet animate-montee retard-2 mx-auto mt-6 w-40" />

          <p className="animate-montee retard-2 mt-6 font-display text-lg tracking-[0.18em] text-or-100 sm:text-xl">
            3 builds. 1 équipe. 0 wipe.
          </p>

          <p className="animate-montee retard-3 mx-auto mt-7 max-w-xl text-base leading-relaxed text-gray-300">
            Trois fiches détaillées pour une équipe réduite qui traverse la campagne sans casse : un
            frontliner qui refuse de tomber, un clerc qui buff et rase, une magicienne qui efface la
            moitié du problème au premier tour. Chaque build est déroulé niveau par niveau, avec les
            stats, les sorts, les erreurs à éviter et la checklist d'avant-combat.
          </p>

          <div className="animate-montee retard-4 mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#builds"
              className="inline-flex items-center gap-3 border border-or-500/50 px-6 py-3 font-rune text-[0.68rem] uppercase tracking-[0.24em] text-or-300 transition-colors duration-300 hover:border-or-300 hover:bg-or-500/10 hover:text-or-100"
            >
              Ouvrir le grimoire
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              to="/compare"
              className="inline-flex items-center gap-3 border border-or-300 bg-or-500/15 px-6 py-3 font-rune text-[0.68rem] uppercase tracking-[0.24em] text-or-100 transition-colors duration-300 hover:bg-or-500/25"
            >
              Comparer
              <span aria-hidden="true">⇄</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Builds */}
      <section id="builds" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24">
        <header className="mb-10 flex items-end justify-between gap-6">
          <h2 className="grave text-xl tracking-[0.14em]">Les trois fiches</h2>
          <span className="glyphe hidden sm:block">{builds.length} builds · Solasta</span>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {builds.map((build, index) => (
            <BuildCard key={build.id} build={build} index={index} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Les synergies */}
      <section id="synergies" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-28">
        <Revelation className="plaque p-6 sm:p-7">
          <p className="glyphe">Les synergies</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {SYNERGIES.map((synergie) => (
              <li key={synergie} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-or-500/80"
                />
                <span>{synergie}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/compare"
            className="glyphe mt-7 inline-flex items-center gap-2 transition-colors hover:text-or-100"
          >
            Voir la comparaison complète <span aria-hidden="true">→</span>
          </Link>
        </Revelation>
      </section>
    </>
  )
}
