import { Link } from 'react-router-dom'
import builds from '../data/builds.js'
import Revelation from '../components/Revelation.jsx'
import { accentDe, variableAccent } from '../lib/accents.js'
import { FORMATION, STYLES, SYNERGIES } from '../lib/formation.js'

const ORDRE_STATS = ['FOR', 'DEX', 'CON', 'INT', 'SAG', 'CHA']

const parId = (id) => builds.find((b) => b.id === id)

// Lignes du tableau comparatif, regroupées par famille.
const FAMILLES = [
  {
    titre: 'Fiche d’identité',
    lignes: [
      { libelle: 'Classe', valeur: (b) => b.classe },
      { libelle: 'Sous-classe', valeur: (b) => b.sousClasse },
      { libelle: 'Rôle', valeur: (b) => b.role },
      { libelle: 'Puissance', valeur: (b) => b.niveauPuissance, sceau: true },
      { libelle: 'Difficulté', valeur: (b) => b.difficulte },
    ],
  },
  {
    titre: 'Caractéristiques',
    lignes: ORDRE_STATS.map((cle) => ({
      libelle: cle,
      valeur: (b) => b.stats[cle],
      chiffre: true,
    })),
  },
  {
    titre: 'Équipement',
    lignes: [
      { libelle: 'Race', valeur: (b) => b.race },
      { libelle: 'Arme', valeur: (b) => b.arme },
      { libelle: 'Armure', valeur: (b) => b.armure },
    ],
  },
]

// ------------------------------------------------------------------ Briques

function Panneau({ id, titre, intro, children }) {
  return (
    <Revelation as="section" id={id} className="plaque scroll-mt-28 p-6 sm:p-8">
      <h2 className="grave text-sm tracking-[0.16em] sm:text-base">{titre}</h2>
      <div className="filet mt-3 w-16" />
      {intro && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">{intro}</p>}
      <div className="mt-6">{children}</div>
    </Revelation>
  )
}

/** Cellule d'en-tête de colonne : un build. */
function EnteteBuild({ build }) {
  const accent = accentDe(build)
  return (
    <th scope="col" className="min-w-[13rem] px-4 py-4 text-left align-bottom">
      <Link
        to={`/build/${build.id}`}
        className="group block"
        style={variableAccent(build)}
      >
        <span aria-hidden="true" className="block text-2xl">
          {build.icone}
        </span>
        <span
          className={`mt-2 block font-display text-[0.72rem] uppercase leading-snug tracking-[0.1em] ${accent.texte} transition-colors group-hover:text-or-100`}
        >
          {build.nom}
        </span>
        <span className="mt-1 block font-rune text-[0.6rem] font-normal uppercase tracking-[0.14em] text-gray-500">
          {build.classe} · {build.sousClasse}
        </span>
        <span aria-hidden="true" className={`mt-3 block h-px w-8 ${accent.trait}`} />
      </Link>
    </th>
  )
}

function TableauComparatif() {
  return (
    <div className="-mx-2 overflow-x-auto px-2">
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparaison des trois builds sur l’identité, les caractéristiques et l’équipement
        </caption>
        <thead>
          <tr className="border-b border-or-700/40 bg-obsidienne">
            <th
              scope="col"
              className="glyphe sticky left-0 z-10 whitespace-nowrap bg-inherit px-4 py-4 font-normal"
            >
              Critère
            </th>
            {builds.map((build) => (
              <EnteteBuild key={build.id} build={build} />
            ))}
          </tr>
        </thead>

        {FAMILLES.map((famille) => (
          <tbody key={famille.titre}>
            <tr>
              <th
                colSpan={builds.length + 1}
                scope="colgroup"
                className="glyphe border-y border-or-700/25 bg-encre px-4 py-2.5 text-left font-normal"
              >
                {famille.titre}
              </th>
            </tr>

            {famille.lignes.map((ligne) => (
              <tr
                key={ligne.libelle}
                className="border-b border-voile/[0.10] bg-slate-800 transition-colors even:bg-slate-750 hover:bg-slate-700"
              >
                <th
                  scope="row"
                  className="glyphe sticky left-0 z-10 whitespace-nowrap bg-inherit px-4 py-3 text-left font-normal"
                >
                  {ligne.libelle}
                </th>
                {builds.map((build) => {
                  const accent = accentDe(build)
                  return (
                    <td
                      key={build.id}
                      className={`px-4 py-3 align-top leading-relaxed ${
                        ligne.chiffre ? `font-rune ${accent.texteVif}` : 'text-gray-300'
                      }`}
                    >
                      {ligne.sceau ? (
                        <span
                          style={variableAccent(build)}
                          className={`sceau-brise inline-block rounded-full border px-2.5 py-1 font-rune text-[0.62rem] uppercase tracking-[0.14em] ${accent.puce}`}
                        >
                          {ligne.valeur(build)}
                        </span>
                      ) : (
                        ligne.valeur(build)
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        ))}

        {/* Aptitudes : quatre lignes de listes, une colonne par build */}
        <tbody>
          <tr>
            <th
              colSpan={builds.length + 1}
              scope="colgroup"
              className="glyphe border-y border-or-700/25 bg-encre px-4 py-2.5 text-left font-normal"
            >
              Aptitudes clés
            </th>
          </tr>
          <tr className="bg-slate-800">
            <th scope="row" className="glyphe sticky left-0 z-10 bg-inherit px-4 py-4 text-left font-normal">
              Top 4
            </th>
            {builds.map((build) => {
              const accent = accentDe(build)
              return (
                <td key={build.id} className="px-4 py-4 align-top">
                  <ul className="space-y-2">
                    {build.aptitudesCles.slice(0, 4).map((aptitude) => (
                      <li key={aptitude} className="flex gap-2.5 leading-snug text-gray-300">
                        <span
                          aria-hidden="true"
                          className={`mt-[0.4rem] h-1.5 w-1.5 shrink-0 rotate-45 ${accent.barre}`}
                        />
                        <span>{aptitude}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

/** Formation front / mid / back, avec connecteurs entre les rôles. */
function SchemaEquipe() {
  return (
    <ol className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch">
      {FORMATION.map((poste, index) => {
        const build = parId(poste.id)
        if (!build) return null
        const accent = accentDe(build)

        return (
          <li key={poste.id} className="contents">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="flex items-center justify-center py-3 font-rune text-lg text-or-500/70 lg:px-4 lg:py-0"
              >
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}

            <div className="group groupe-plaque flex-1" style={variableAccent(build)}>
              <Link
                to={`/build/${build.id}`}
                className={`plaque accent-vif flex h-full flex-col border-l-4 ${accent.bord} p-5`}
              >
                <p className="glyphe">{poste.ligne}</p>
                <p className="mt-3 flex items-center gap-3">
                  <span aria-hidden="true" className="sceau-carte text-3xl">
                    {build.icone}
                  </span>
                  <span className={`font-display text-[0.72rem] uppercase leading-snug tracking-[0.1em] ${accent.texte}`}>
                    {build.nom}
                  </span>
                </p>
                <p className="mt-4 font-rune text-[0.62rem] uppercase tracking-[0.14em] text-gray-500">
                  {poste.place}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{poste.mission}</p>
              </Link>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// -------------------------------------------------------------------- Page

export default function Compare() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-10">
      <Link to="/" className="glyphe inline-flex items-center gap-2 transition-colors hover:text-or-100">
        <span aria-hidden="true">←</span> Retour à l'accueil
      </Link>

      <header className="mt-6 text-center">
        <p className="glyphe">Trois fiches, une table de comparaison</p>
        <h1 className="grave lueur-titre mt-4 text-2xl leading-tight tracking-[0.12em] sm:text-4xl">
          Comparer les builds
        </h1>
        <div className="filet mx-auto mt-5 w-32" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300">
          Les mêmes chiffres, alignés colonne par colonne : qui encaisse, qui soutient, qui efface le
          combat. En bas de page, la formation et le verdict de chaque fiche.
        </p>
      </header>

      <div className="mt-12 space-y-6">
        <Panneau
          id="tableau"
          titre="Tableau comparatif"
          intro="Identité, caractéristiques, équipement et aptitudes clés. Le tableau défile horizontalement sur petit écran."
        >
          <TableauComparatif />
        </Panneau>

        <Panneau
          id="styles"
          titre="Quelle compo pour quel style ?"
          intro="Les trois builds se jouent ensemble — mais tout le monde n'a pas envie de piloter la même fiche."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {STYLES.map((style) => {
              const build = parId(style.build)
              const accent = accentDe(build)
              return (
                <article
                  key={style.titre}
                  className={`flex flex-col border-l-2 ${accent.bord} ${accent.fondDoux} p-5`}
                >
                  <span aria-hidden="true" className="text-2xl">
                    {style.icone}
                  </span>
                  <h3 className="mt-3 font-display text-sm uppercase leading-snug tracking-[0.08em] text-or-100">
                    {style.titre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-300">{style.texte}</p>
                  <Link
                    to={`/build/${build.id}`}
                    className={`glyphe mt-auto inline-flex items-center gap-2 pt-5 transition-colors hover:text-or-100 ${accent.texte}`}
                  >
                    {build.nom} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              )
            })}
          </div>
        </Panneau>

        <Panneau
          id="formation"
          titre="Le schéma d'équipe"
          intro="Trois lignes, trois missions. Le placement compte autant que les fiches."
        >
          <SchemaEquipe />

          <div className="mt-8 border-t border-or-700/25 pt-6">
            <p className="glyphe">Ce que la formation gagne</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {SYNERGIES.map((synergie) => (
                <li key={synergie} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                  <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-or-500/80" />
                  <span>{synergie}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panneau>

        <Panneau id="verdicts" titre="Le verdict, build par build">
          <div className="space-y-4">
            {FORMATION.map((poste) => {
              const build = parId(poste.id)
              if (!build) return null
              const accent = accentDe(build)
              return (
                <figure
                  key={poste.id}
                  className={`border-l-2 ${accent.bord} ${accent.fondDoux} py-4 pl-5 pr-4`}
                >
                  <figcaption className="flex flex-wrap items-center gap-3">
                    <span aria-hidden="true" className="text-xl">
                      {build.icone}
                    </span>
                    <span className={`font-display text-[0.72rem] uppercase tracking-[0.1em] ${accent.texte}`}>
                      {build.nom}
                    </span>
                  </figcaption>
                  <blockquote className="mt-3 font-grimoire text-base italic leading-relaxed text-gray-200">
                    {poste.verdict}
                  </blockquote>
                </figure>
              )
            })}
          </div>
        </Panneau>
      </div>
    </div>
  )
}
