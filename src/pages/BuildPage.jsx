import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import builds from '../data/builds.js'
import Grimoire from '../components/Grimoire.jsx'
import Revelation from '../components/Revelation.jsx'
import { accentDe, variableAccent } from '../lib/accents.js'

const ORDRE_STATS = ['FOR', 'DEX', 'CON', 'INT', 'SAG', 'CHA']
const STAT_MAX = 20

// Les cartes de synthèse s'intercalent entre les sections, ancrées à la section
// qui les précède. Une carte dont l'ancre manque est renvoyée en fin de fiche.
const CARTES = [
  { id: 'stats-express', titre: 'Stats express', apres: 'synthese' },
  { id: 'progression', titre: 'Progression', apres: 'core' },
  { id: 'forces-faiblesses', titre: 'Forces & faiblesses', apres: 'tactiques' },
  { id: 'equipe', titre: "Composition d'équipe", apres: 'composition' },
]

const LIENS_RAPIDES = [
  { id: 'stats-express', libelle: 'Stats' },
  { id: 'progression', libelle: 'Progression' },
  { id: 'forces-faiblesses', libelle: 'Forces / faiblesses' },
  { id: 'equipe', libelle: 'Composition' },
]

/** Sections et cartes dans leur ordre d'affichage. */
function construireFlux(build) {
  if (!build) return []

  const restantes = [...CARTES]
  const flux = []

  for (const section of build.sections) {
    flux.push({ type: 'section', id: section.id, titre: section.titre, section })
    for (let i = restantes.length - 1; i >= 0; i--) {
      if (restantes[i].apres === section.id) {
        const carte = restantes.splice(i, 1)[0]
        flux.push({ type: 'carte', id: carte.id, titre: carte.titre })
      }
    }
  }
  for (const carte of restantes) flux.push({ type: 'carte', id: carte.id, titre: carte.titre })

  return flux
}

/** « 16-17 » → { min: 16, max: 17 } ; « 14 » → { min: 14, max: 14 }. */
function borneStat(valeur) {
  const nombres = String(valeur ?? '').match(/\d+/g)?.map(Number) ?? []
  if (nombres.length === 0) return { min: 0, max: 0 }
  return { min: nombres[0], max: nombres[nombres.length - 1] }
}

// ------------------------------------------------------------------ Briques

function Panneau({ id, titre, eyebrow, children, className = '' }) {
  return (
    <Revelation as="section" id={id} className={`plaque scroll-mt-28 p-6 sm:p-7 ${className}`}>
      <header>
        {eyebrow && <p className="glyphe mb-2">{eyebrow}</p>}
        <h2 className="grave text-sm tracking-[0.16em] sm:text-base">{titre}</h2>
        <div className="filet mt-3 w-16" />
      </header>
      <div className="mt-6">{children}</div>
    </Revelation>
  )
}

function BarreStat({ cle, valeur, accent }) {
  const { min, max } = borneStat(valeur)
  const pct = (n) => `${Math.min(100, (n / STAT_MAX) * 100)}%`

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="glyphe">{cle}</span>
        <span className="font-rune text-sm text-gray-100">{valeur}</span>
      </div>
      <div className="relative mt-2 h-1.5 w-full bg-white/[0.06]">
        {/* Le fantôme couvre la borne haute de la fourchette, la barre pleine la borne basse */}
        <span aria-hidden="true" className={`absolute inset-y-0 left-0 ${accent.barreFantome}`} style={{ width: pct(max) }} />
        <span aria-hidden="true" className={`absolute inset-y-0 left-0 ${accent.barre}`} style={{ width: pct(min) }} />
      </div>
    </div>
  )
}

function CarteStats({ build, accent }) {
  const alt = build.statsAlternatives

  return (
    <Panneau id="stats-express" eyebrow="Carte" titre="Stats express">
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {ORDRE_STATS.map((cle) => (
          <BarreStat key={cle} cle={cle} valeur={build.stats[cle]} accent={accent} />
        ))}
      </div>

      {alt && (
        <div className={`mt-7 border-t border-dashed ${accent.bordDoux} pt-5`}>
          <p className="glyphe">Variante · {alt.label}</p>
          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {ORDRE_STATS.map((cle) => (
              <div key={cle} className="flex items-baseline gap-1.5">
                <dt className="font-rune text-[0.6rem] uppercase tracking-[0.18em] text-gray-500">{cle}</dt>
                <dd className="font-rune text-xs text-gray-300">{alt[cle]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <dl className="mt-7 space-y-4 border-t border-or-700/25 pt-5">
        {[
          ['Race recommandée', build.race],
          ['Arme', build.arme],
          ['Armure', build.armure],
        ].map(([libelle, valeur]) => (
          <div key={libelle} className="sm:flex sm:gap-6">
            <dt className="glyphe sm:w-44 sm:shrink-0 sm:pt-0.5">{libelle}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-300 sm:mt-0">{valeur}</dd>
          </div>
        ))}
      </dl>
    </Panneau>
  )
}

function CarteProgression({ build, accent }) {
  return (
    <Panneau id="progression" eyebrow="Carte" titre="Progression niveau par niveau">
      <p className="mb-5 text-sm text-gray-400">
        {build.progression.length} paliers, du niveau {build.progression[0].niveau} au niveau{' '}
        {build.progression[build.progression.length - 1].niveau}.
      </p>

      {/* Frise verticale sur mobile, horizontale et défilable sur desktop */}
      <ol className="-mx-1 flex flex-col gap-4 px-1 lg:snap-x lg:snap-mandatory lg:flex-row lg:overflow-x-auto lg:pb-4">
        {build.progression.map((etape, index) => (
          <Revelation
            as="li"
            key={etape.niveau}
            variante="gauche"
            delai={Math.min(index, 6) * 70}
            className={`flex flex-col border ${accent.bordDoux} ${accent.fondDoux} p-4 lg:w-72 lg:shrink-0 lg:snap-start`}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${accent.bord} font-rune text-xs ${accent.texteVif}`}
              >
                {etape.niveau}
              </span>
              <span className="glyphe">Niveau {etape.niveau}</span>
            </div>

            <h3 className="mt-3 font-display text-sm uppercase leading-snug tracking-[0.08em] text-or-100">
              {etape.titre}
            </h3>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {etape.acquis.map((acquis) => (
                <li
                  key={acquis}
                  className="border border-white/10 bg-white/[0.04] px-2 py-1 font-rune text-[0.62rem] leading-snug text-gray-300"
                >
                  {acquis}
                </li>
              ))}
            </ul>

            <p className="mt-auto pt-4 text-sm italic leading-relaxed text-gray-400">{etape.tactique}</p>
          </Revelation>
        ))}
      </ol>
    </Panneau>
  )
}

function CarteForces({ build }) {
  const colonnes = [
    {
      titre: 'Ce qui marche',
      items: build.avantages,
      puce: '+',
      style: 'border-emerald-400/25 bg-emerald-400/[0.06]',
      couleurPuce: 'text-emerald-300',
    },
    {
      titre: 'Ce qui coince',
      items: build.inconvenients,
      puce: '−',
      style: 'border-red-400/25 bg-red-400/[0.06]',
      couleurPuce: 'text-red-300',
    },
  ]

  return (
    <Panneau id="forces-faiblesses" eyebrow="Carte" titre="Forces & faiblesses">
      <div className="grid gap-4 md:grid-cols-2">
        {colonnes.map((colonne) => (
          <div key={colonne.titre} className={`border ${colonne.style} p-5`}>
            <p className="glyphe">{colonne.titre}</p>
            <ul className="mt-4 space-y-3">
              {colonne.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                  <span aria-hidden="true" className={`shrink-0 font-rune ${colonne.couleurPuce}`}>
                    {colonne.puce}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panneau>
  )
}

function CarteEquipe({ build, accent }) {
  return (
    <Panneau id="equipe" eyebrow="Carte" titre="Composition d'équipe">
      <div className="flex flex-col items-stretch gap-3 md:flex-row">
        {builds.map((membre, index) => {
          const courant = membre.id === build.id
          return (
            <div key={membre.id} className="contents">
              {index > 0 && (
                <span aria-hidden="true" className="self-center font-rune text-or-500/70">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
              <Link
                to={`/build/${membre.id}`}
                className={`flex flex-1 items-center gap-4 border p-4 transition-colors md:flex-col md:items-start ${
                  courant
                    ? `${accent.bord} ${accent.fond}`
                    : 'border-white/10 bg-white/[0.02] hover:border-or-500/40 hover:bg-or-500/[0.06]'
                }`}
              >
                <span aria-hidden="true" className="text-3xl">
                  {membre.icone}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[0.72rem] uppercase leading-snug tracking-[0.1em] text-or-100">
                    {membre.nom}
                  </span>
                  <span className="mt-1 block font-rune text-[0.62rem] uppercase tracking-[0.14em] text-gray-500">
                    {membre.classe} · {membre.sousClasse}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-gray-400">{membre.role}</span>
                </span>
              </Link>
            </div>
          )
        })}
      </div>

      <figure className={`mt-6 border-l-2 ${accent.bord} ${accent.fondDoux} py-4 pl-5 pr-4`}>
        <figcaption className="glyphe">Boucle de jeu</figcaption>
        <blockquote className={`mt-2 font-rune text-sm leading-relaxed ${accent.texte}`}>
          « {build.boucleDeJeu} »
        </blockquote>
      </figure>
    </Panneau>
  )
}

function Sommaire({ flux, actif, accent, onNaviguer, avecTitre = true }) {
  return (
    <nav aria-label="Sections de la fiche">
      {avecTitre && <p className="glyphe">Sommaire</p>}
      <ul className={`${avecTitre ? 'mt-4' : ''} space-y-0.5 border-l border-or-700/25`}>
        {flux.map((entree) => {
          const courant = entree.id === actif
          return (
            <li key={entree.id}>
              <a
                href={`#${entree.id}`}
                onClick={onNaviguer}
                aria-current={courant ? 'true' : undefined}
                className={`-ml-px flex items-center gap-2 border-l py-1.5 pr-2 text-sm leading-snug transition-all duration-300 ease-out ${
                  courant
                    ? `${accent.bord} ${accent.texte} pl-5`
                    : 'border-transparent pl-4 text-gray-400 hover:border-or-500/40 hover:text-or-100'
                }`}
              >
                {entree.type === 'carte' && (
                  <span aria-hidden="true" className={`h-1 w-1 shrink-0 rotate-45 ${accent.barre}`} />
                )}
                {entree.titre}
              </a>
            </li>
          )
        })}
      </ul>

      <p className="glyphe mt-7">Liens rapides</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {LIENS_RAPIDES.map((lien) => (
          <li key={lien.id}>
            <a
              href={`#${lien.id}`}
              onClick={onNaviguer}
              className="inline-block rounded-full border border-white/10 px-3 py-1 font-rune text-[0.6rem] uppercase tracking-[0.14em] text-gray-400 transition-colors hover:border-or-500/50 hover:text-or-100"
            >
              {lien.libelle}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// -------------------------------------------------------------------- Page

export default function BuildPage() {
  const { id } = useParams()
  const build = builds.find((b) => b.id === id)
  const accent = accentDe(build)

  const flux = useMemo(() => construireFlux(build), [build])
  const [actif, setActif] = useState(null)
  const accordeon = useRef(null)

  // Nouvelle fiche : on repart du haut du parchemin.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Surbrillance de la section en cours de lecture.
  useEffect(() => {
    if (flux.length === 0) return

    const ids = flux.map((entree) => entree.id)
    let image = 0

    const mesurer = () => {
      let courant = ids[0]
      for (const cle of ids) {
        const element = document.getElementById(cle)
        if (element && element.getBoundingClientRect().top <= 160) courant = cle
      }
      // En bas de page, la dernière section ne franchit jamais le seuil.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        courant = ids[ids.length - 1]
      }
      setActif(courant)
    }

    const surScroll = () => {
      cancelAnimationFrame(image)
      image = requestAnimationFrame(mesurer)
    }

    mesurer()
    window.addEventListener('scroll', surScroll, { passive: true })
    window.addEventListener('resize', surScroll)
    return () => {
      cancelAnimationFrame(image)
      window.removeEventListener('scroll', surScroll)
      window.removeEventListener('resize', surScroll)
    }
  }, [flux])

  if (!build) {
    return (
      <section className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="grave text-2xl tracking-[0.14em]">Page introuvable</h1>
        <p className="mt-4 text-gray-400">
          Aucun build ne porte l'identifiant « {id} ». Il a dû rater sa sauvegarde.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border border-or-500/50 px-5 py-2.5 font-rune text-[0.68rem] uppercase tracking-[0.2em] text-or-300 transition-colors hover:border-or-300 hover:text-or-100"
        >
          Retour à l'accueil
        </Link>
      </section>
    )
  }

  const refermerAccordeon = () => {
    if (accordeon.current) accordeon.current.open = false
  }

  const cartes = {
    'stats-express': <CarteStats build={build} accent={accent} />,
    progression: <CarteProgression build={build} accent={accent} />,
    'forces-faiblesses': <CarteForces build={build} />,
    equipe: <CarteEquipe build={build} accent={accent} />,
  }

  return (
    <article className="mx-auto max-w-6xl px-5 pb-28 pt-10" style={variableAccent(build)}>
      <Link to="/" className="glyphe inline-flex items-center gap-2 transition-colors hover:text-or-100">
        <span aria-hidden="true">←</span> Tous les builds
      </Link>

      {/* -------------------------------------------------------- En-tête */}
      <header className="animate-montee plaque mt-6 overflow-hidden p-6 sm:p-9">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${accent.halo} to-transparent blur-3xl`}
        />

        <div className="relative flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 items-start gap-5">
            <span aria-hidden="true" className="text-5xl leading-none sm:text-6xl">
              {build.icone}
            </span>
            <div className="min-w-0">
              <h1 className="grave text-2xl leading-tight tracking-[0.09em] sm:text-4xl">{build.nom}</h1>
              <p className="mt-2 font-rune text-[0.68rem] uppercase tracking-[0.18em] text-gray-400">
                {build.classe} · {build.sousClasse} · {build.jeu}
              </p>
            </div>
          </div>
        </div>

        <ul className="relative mt-7 flex flex-wrap gap-2">
          <li
            className={`${
              build.niveauPuissance === 'Broken' ? 'sceau-brise' : ''
            } rounded-full border px-3 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] ${accent.puce}`}
          >
            {build.niveauPuissance}
          </li>
          <li className="rounded-full border border-gray-600/50 px-3 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] text-gray-400">
            Difficulté · {build.difficulte}
          </li>
          <li className="rounded-full border border-gray-600/50 px-3 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] text-gray-400">
            {build.role}
          </li>
          <li className="rounded-full border border-gray-600/50 px-3 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] text-gray-400">
            Équipe de {build.tailleEquipe}
          </li>
        </ul>

        <p className="relative mt-6 max-w-3xl text-base leading-relaxed text-gray-300">{build.resume}</p>
      </header>

      {/* ------------------------------------------------ Sommaire mobile */}
      <details
        ref={accordeon}
        className="plaque group sticky top-[4.5rem] z-30 mt-6 bg-obsidienne/95 p-5 lg:hidden"
      >
        <summary className="glyphe flex cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
          <span>Sommaire de la fiche · {flux.length} entrées</span>
          <span aria-hidden="true" className="font-rune text-sm">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="mt-5 max-h-[60vh] overflow-y-auto">
          <Sommaire
            flux={flux}
            actif={actif}
            accent={accent}
            onNaviguer={refermerAccordeon}
            avecTitre={false}
          />
        </div>
      </details>

      <div className="mt-8 gap-10 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        {/* ------------------------------------------ Sommaire desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 pr-2">
            <Sommaire flux={flux} actif={actif} accent={accent} />
          </div>
        </aside>

        {/* -------------------------------------------------- Contenu */}
        <div className="space-y-6">
          {flux.map((entree) =>
            entree.type === 'carte' ? (
              <div key={entree.id}>{cartes[entree.id]}</div>
            ) : (
              <Panneau key={entree.id} id={entree.id} titre={entree.titre}>
                <Grimoire contenu={entree.section.contenu} accent={accent} />
              </Panneau>
            ),
          )}

          {/* Aptitudes et sorts : les listes de référence, en fin de fiche */}
          <div className="grid gap-6 md:grid-cols-2">
            <Panneau id="aptitudes" titre="Aptitudes clés">
              <ul className="space-y-2.5">
                {build.aptitudesCles.map((aptitude) => (
                  <li key={aptitude} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 ${accent.barre}`} />
                    <span>{aptitude}</span>
                  </li>
                ))}
              </ul>
            </Panneau>

            {build.sortsCles.length > 0 && (
              <Panneau id="sorts" titre="Sorts clés">
                <ul className="flex flex-wrap gap-2">
                  {build.sortsCles.map((sort) => (
                    <li
                      key={sort}
                      className={`border ${accent.bordDoux} ${accent.fond} px-2.5 py-1 font-rune text-[0.65rem] ${accent.texte}`}
                    >
                      {sort}
                    </li>
                  ))}
                </ul>
              </Panneau>
            )}
          </div>

          {/* ------------------------------------------------- Verdict */}
          <section className="plaque border-or-500/40 p-6 sm:p-8">
            <h2 className="grave text-sm tracking-[0.16em]">Le mot de la fin</h2>
            <div className="filet mt-3 w-16" />
            <blockquote className="mt-6 border-l-2 border-or-500/50 pl-5 font-grimoire text-base italic leading-relaxed text-gray-200">
              {build.noteFinale}
            </blockquote>
            {build.urlSource && (
              <a
                href={build.urlSource}
                target="_blank"
                rel="noreferrer"
                className="glyphe mt-6 inline-flex items-center gap-2 transition-colors hover:text-or-100"
              >
                Source du build <span aria-hidden="true">↗</span>
              </a>
            )}
          </section>
        </div>
      </div>
    </article>
  )
}
