/**
 * Rendu du Markdown des fiches de build.
 *
 * Le contenu des sections (src/data/builds.js) reste volontairement en Markdown
 * brut. Plutôt que d'embarquer une librairie complète, on ne gère ici que les
 * quatre formes réellement présentes dans les fiches — tableaux, listes
 * (à puces, numérotées, cases à cocher), gras, et paragraphes de callout
 * introduits par une émoji.
 */

// ------------------------------------------------------------------ Callouts

// Parchemins encartés : fond plus clair que la plaque, filet de couleur à gauche.
const CALLOUTS = {
  '✅': { bord: 'border-l-emerald-400/70', fond: 'bg-emerald-400/[0.1]' },
  '⚠️': { bord: 'border-l-red-400/70', fond: 'bg-red-400/[0.1]' },
  '💥': { bord: 'border-l-purple-400/70', fond: 'bg-purple-400/[0.1]' },
  '🪨': { bord: 'border-l-slate-300/60', fond: 'bg-slate-300/[0.08]' },
  '🔎': { bord: 'border-l-sky-400/70', fond: 'bg-sky-400/[0.1]' },
}

const EMOJIS_CALLOUT = Object.keys(CALLOUTS)

/** Renvoie l'émoji de callout ouvrant le texte, ou null. */
function callout(texte) {
  return EMOJIS_CALLOUT.find((emoji) => texte.trimStart().startsWith(emoji)) ?? null
}

// -------------------------------------------------------------------- Inline

/** Transforme `**gras**` en <strong>, laisse le reste tel quel. */
function inline(texte) {
  const morceaux = []
  let curseur = 0

  for (const trouve of texte.matchAll(/\*\*(.+?)\*\*/g)) {
    if (trouve.index > curseur) morceaux.push(texte.slice(curseur, trouve.index))
    morceaux.push(
      <strong key={trouve.index} className="font-semibold text-or-100">
        {trouve[1]}
      </strong>,
    )
    curseur = trouve.index + trouve[0].length
  }
  if (curseur < texte.length) morceaux.push(texte.slice(curseur))

  return morceaux.map((morceau, i) =>
    typeof morceau === 'string' ? <span key={`t${i}`}>{morceau}</span> : morceau,
  )
}

// -------------------------------------------------------------------- Parser

const EST_TABLEAU = (l) => l.trimStart().startsWith('|')
const EST_SEPARATEUR = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l)
const EST_TACHE = (l) => /^\s*[-*]\s+\[[ xX]\]\s*/.test(l)
const EST_PUCE = (l) => /^\s*[-*]\s+/.test(l)
const EST_NUMERO = (l) => /^\s*\d+\.\s+/.test(l)
const OUVRE_BLOC = (l) => EST_TABLEAU(l) || EST_TACHE(l) || EST_PUCE(l) || EST_NUMERO(l)

const cellules = (ligne) =>
  ligne
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => c.trim())

/** Découpe le Markdown en blocs typés. */
function decouper(markdown) {
  const lignes = String(markdown ?? '').split('\n')
  const blocs = []
  let i = 0

  while (i < lignes.length) {
    const ligne = lignes[i]

    if (!ligne.trim()) {
      i++
      continue
    }

    if (EST_TABLEAU(ligne)) {
      const brutes = []
      while (i < lignes.length && EST_TABLEAU(lignes[i])) brutes.push(lignes[i++])
      const [entete, ...reste] = brutes
      blocs.push({
        type: 'tableau',
        entete: cellules(entete),
        lignes: reste.filter((l) => !EST_SEPARATEUR(l)).map(cellules),
      })
      continue
    }

    if (EST_TACHE(ligne)) {
      const items = []
      while (i < lignes.length && EST_TACHE(lignes[i])) {
        items.push({
          coche: /\[[xX]\]/.test(lignes[i]),
          texte: lignes[i].replace(/^\s*[-*]\s+\[[ xX]\]\s*/, ''),
        })
        i++
      }
      blocs.push({ type: 'taches', items })
      continue
    }

    if (EST_PUCE(ligne)) {
      const items = []
      while (i < lignes.length && EST_PUCE(lignes[i]) && !EST_TACHE(lignes[i])) {
        items.push(lignes[i].replace(/^\s*[-*]\s+/, ''))
        i++
      }
      blocs.push({ type: 'puces', items })
      continue
    }

    if (EST_NUMERO(ligne)) {
      const items = []
      while (i < lignes.length && EST_NUMERO(lignes[i])) {
        items.push(lignes[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      blocs.push({ type: 'numeros', items })
      continue
    }

    // Paragraphe : tout jusqu'à une ligne vide ou l'ouverture d'un autre bloc.
    const texte = []
    while (i < lignes.length && lignes[i].trim() && !OUVRE_BLOC(lignes[i])) {
      texte.push(lignes[i])
      i++
    }
    const emoji = callout(texte[0])
    blocs.push(emoji ? { type: 'callout', emoji, texte } : { type: 'paragraphe', texte })
  }

  return blocs
}

// ------------------------------------------------------------------- Rendus

function Tableau({ bloc }) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-or-700/40 bg-encre">
            {bloc.entete.map((cellule, i) => (
              <th key={i} className="glyphe px-3 py-2.5 font-normal">
                {inline(cellule)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bloc.lignes.map((rangee, i) => (
            <tr
              key={i}
              className="border-b border-white/5 transition-colors last:border-0 odd:bg-slate-800/70 even:bg-slate-750/50 hover:bg-slate-700/70"
            >
              {rangee.map((cellule, j) => (
                <td
                  key={j}
                  className={`px-3 py-2.5 align-top leading-relaxed ${
                    j === 0 ? 'font-rune text-[0.72rem] uppercase tracking-[0.08em] text-or-300' : 'text-gray-300'
                  }`}
                >
                  {inline(cellule)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Puces({ bloc, accent }) {
  return (
    <ul className="space-y-2">
      {bloc.items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-gray-300">
          <span aria-hidden="true" className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 ${accent.barre}`} />
          <span>{inline(item)}</span>
        </li>
      ))}
    </ul>
  )
}

function Numeros({ bloc, accent }) {
  return (
    <ol className="space-y-2.5">
      {bloc.items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-gray-300">
          <span
            aria-hidden="true"
            className={`mt-0.5 w-5 shrink-0 text-right font-rune text-[0.7rem] ${accent.texteVif}`}
          >
            {i + 1}
          </span>
          <span>{inline(item)}</span>
        </li>
      ))}
    </ol>
  )
}

function Taches({ bloc, accent }) {
  return (
    <ul className="space-y-2">
      {bloc.items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-gray-300">
          <span
            aria-hidden="true"
            className={`mt-1 h-3.5 w-3.5 shrink-0 border ${accent.bord} ${item.coche ? accent.fond : 'bg-transparent'}`}
          />
          <span>{inline(item.texte)}</span>
        </li>
      ))}
    </ul>
  )
}

function LignesTexte({ texte }) {
  return texte.map((ligne, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {inline(ligne)}
    </span>
  ))
}

function Callout({ bloc }) {
  const style = CALLOUTS[bloc.emoji]
  const premiere = bloc.texte[0].trimStart().slice(bloc.emoji.length).trimStart()
  const texte = [premiere, ...bloc.texte.slice(1)]

  return (
    <div className={`flex gap-4 rounded-sm border-l-4 ${style.bord} ${style.fond} px-4 py-4`}>
      <span aria-hidden="true" className="shrink-0 text-3xl leading-none">
        {bloc.emoji}
      </span>
      <p className="leading-relaxed text-gray-200">
        <LignesTexte texte={texte} />
      </p>
    </div>
  )
}

/** Rendu complet d'un contenu Markdown de fiche. */
export default function Grimoire({ contenu, accent }) {
  const blocs = decouper(contenu)

  return (
    <div className="space-y-5 text-[0.95rem]">
      {blocs.map((bloc, i) => {
        switch (bloc.type) {
          case 'tableau':
            return <Tableau key={i} bloc={bloc} />
          case 'puces':
            return <Puces key={i} bloc={bloc} accent={accent} />
          case 'numeros':
            return <Numeros key={i} bloc={bloc} accent={accent} />
          case 'taches':
            return <Taches key={i} bloc={bloc} accent={accent} />
          case 'callout':
            return <Callout key={i} bloc={bloc} />
          default:
            return (
              <p key={i} className="leading-relaxed text-gray-300">
                <LignesTexte texte={bloc.texte} />
              </p>
            )
        }
      })}
    </div>
  )
}
