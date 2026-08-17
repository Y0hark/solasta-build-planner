/**
 * Auto-liens vers le wiki Solasta Fandom.
 *
 * Repère dans un texte les termes connus de src/data/wikiLinks.js et les
 * transforme en liens dorés, chacun surmonté d'une infobulle rappelant la
 * rubrique du wiki visée.
 *
 * Deux garde-fous, sans quoi une fiche devient un champ de liens illisible :
 *   - un terme n'est lié que s'il est isolé (« Ragequit » ne déclenche pas
 *     « Rage ») ;
 *   - un terme n'est lié qu'à sa première occurrence dans un même texte.
 *
 * Point d'entrée principal : `lierTermesWiki(texte, prefixe)`, appelé par
 * Grimoire pour chaque fragment de texte des fiches. Le composant par défaut
 * `<WikiTooltip text=… />` fait la même chose pour une chaîne isolée.
 */

import wikiLinks from '../data/wikiLinks.js'

// Termes du plus long au plus court : « Spirit Guardians » doit être testé
// avant « Spirit », sinon l'alternation s'arrête sur le préfixe.
const CLES = Object.keys(wikiLinks).sort((a, b) => b.length - a.length)

// Retour du texte trouvé (casse quelconque) vers la clé canonique du fichier.
const PAR_MINUSCULE = new Map(CLES.map((cle) => [cle.toLowerCase(), cle]))

const echapper = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const MOTIF = new RegExp(CLES.map(echapper).join('|'), 'gi')

// Un terme collé à une lettre ou un chiffre fait partie d'un mot plus long.
const ALPHANUM = /[\p{L}\p{N}]/u

const estAlphanum = (caractere) => Boolean(caractere) && ALPHANUM.test(caractere)

// ------------------------------------------------------------------- Rendu

const CLASSE_LIEN =
  'border-b border-dotted border-or-500/50 text-or-300 transition-colors hover:border-or-300 hover:text-or-100 focus-visible:text-or-100'

/** « …/wiki/Dwarves#Hill_dwarves » → { page: 'Dwarves', section: 'Hill dwarves' }. */
function cibleWiki(url) {
  const [chemin, ancre] = String(url).split('/').pop().split('#')
  const lisible = (part) => decodeURIComponent(part).replace(/_/g, ' ')
  return { page: lisible(chemin), section: ancre ? lisible(ancre) : null }
}

function LienWiki({ terme, cle, simple = false }) {
  const { url, rubrique } = wikiLinks[cle]
  const { page, section } = cibleWiki(url)

  // Dans un conteneur qui défile (les tableaux), une infobulle en position
  // absolue serait rognée : on se rabat sur l'infobulle native du navigateur.
  if (simple) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        title={`${rubrique} · ${section ? `${page} → ${section}` : page} · wiki Solasta`}
        className={CLASSE_LIEN}
      >
        {terme}
      </a>
    )
  }

  return (
    <span className="group relative inline-block">
      <a href={url} target="_blank" rel="noreferrer" className={CLASSE_LIEN}>
        {terme}
      </a>

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-56 -translate-x-1/2 border border-or-700/50 bg-obsidienne px-3 py-2.5 text-left opacity-0 shadow-sceau transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <span className="glyphe block">{rubrique}</span>
        <span className="mt-1 block font-display text-[0.72rem] uppercase leading-snug tracking-[0.08em] text-or-100">
          {page}
        </span>
        {section && (
          <span className="mt-1 block font-rune text-[0.62rem] uppercase leading-snug tracking-[0.1em] text-or-300/80">
            § {section}
          </span>
        )}
        <span className="mt-2 block font-rune text-[0.6rem] uppercase tracking-[0.14em] text-gray-500">
          Wiki Fandom ↗
        </span>
      </span>
    </span>
  )
}

// ------------------------------------------------------------------ Repérage

/**
 * Découpe un texte en fragments, les termes connus devenant des <LienWiki>.
 * Renvoie toujours un tableau.
 *
 * Options :
 *   - `prefixe` : préfixe des clés React, quand plusieurs textes cohabitent
 *     dans un même parent ;
 *   - `vus` : Set partagé entre plusieurs appels, pour ne lier un terme qu'une
 *     fois par bloc et non une fois par fragment ;
 *   - `simple` : infobulle native plutôt que le calque (voir LienWiki).
 */
export function lierTermesWiki(texte, { prefixe = 'w', vus = new Set(), simple = false } = {}) {
  const source = String(texte ?? '')
  if (!source) return []

  const morceaux = []
  let curseur = 0
  let trouve

  MOTIF.lastIndex = 0
  while ((trouve = MOTIF.exec(source)) !== null) {
    const debut = trouve.index
    const fin = debut + trouve[0].length
    const cle = PAR_MINUSCULE.get(trouve[0].toLowerCase())

    // Terme inconnu (impossible en théorie), enchâssé dans un mot, ou déjà lié
    // plus haut dans le même texte : on le laisse en clair.
    if (!cle || vus.has(cle) || estAlphanum(source[debut - 1]) || estAlphanum(source[fin])) {
      continue
    }

    if (debut > curseur) morceaux.push(source.slice(curseur, debut))
    morceaux.push(<LienWiki key={`${prefixe}-${debut}`} terme={trouve[0]} cle={cle} simple={simple} />)
    vus.add(cle)
    curseur = fin
  }

  if (morceaux.length === 0) return [source]
  if (curseur < source.length) morceaux.push(source.slice(curseur))

  return morceaux
}

/** Version composant, pour un texte isolé hors du Grimoire. */
export default function WikiTooltip({ text }) {
  if (!text) return null
  return <>{lierTermesWiki(text)}</>
}
