// Palette d'accent par build. Les classes sont écrites en entier :
// Tailwind ne détecte pas les noms de classes construits à la volée.
export const ACCENTS = {
  red: {
    // Canaux RGB bruts : alimentent la variable CSS --accent (lueurs, bordures animées)
    rgb: '248 113 113',
    halo: 'from-red-500/25',
    trait: 'bg-red-400/70',
    puce: 'border-red-400/40 text-red-200/90',
    texte: 'text-red-200',
    texteVif: 'text-red-300',
    bord: 'border-red-400/40',
    bordDoux: 'border-red-400/20',
    fond: 'bg-red-500/10',
    fondDoux: 'bg-red-500/[0.05]',
    barre: 'bg-red-400/80',
    barreFantome: 'bg-red-400/25',
  },
  yellow: {
    rgb: '252 211 77',
    halo: 'from-amber-400/25',
    trait: 'bg-amber-300/70',
    puce: 'border-amber-300/40 text-amber-100/90',
    texte: 'text-amber-100',
    texteVif: 'text-amber-200',
    bord: 'border-amber-300/40',
    bordDoux: 'border-amber-300/20',
    fond: 'bg-amber-400/10',
    fondDoux: 'bg-amber-400/[0.05]',
    barre: 'bg-amber-300/80',
    barreFantome: 'bg-amber-300/25',
  },
  purple: {
    rgb: '192 132 252',
    halo: 'from-purple-500/25',
    trait: 'bg-purple-400/70',
    puce: 'border-purple-400/40 text-purple-200/90',
    texte: 'text-purple-200',
    texteVif: 'text-purple-300',
    bord: 'border-purple-400/40',
    bordDoux: 'border-purple-400/20',
    fond: 'bg-purple-500/10',
    fondDoux: 'bg-purple-500/[0.05]',
    barre: 'bg-purple-400/80',
    barreFantome: 'bg-purple-400/25',
  },
}

export const ACCENT_DEFAUT = ACCENTS.yellow

export function accentDe(build) {
  return ACCENTS[build?.couleurAccent] ?? ACCENT_DEFAUT
}

/**
 * Style inline exposant la couleur d'accent aux animations CSS.
 * Les lueurs et bordures animées lisent `rgb(var(--accent) / …)`.
 */
export function variableAccent(build) {
  return { '--accent': accentDe(build).rgb }
}
