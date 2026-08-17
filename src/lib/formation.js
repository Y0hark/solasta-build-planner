/**
 * Lecture « équipe » des trois builds : place sur le terrain, mission et
 * verdict. Ces données décrivent la composition, pas les builds eux-mêmes —
 * elles vivent donc ici plutôt que dans src/data/builds.js.
 *
 * L'ordre du tableau est l'ordre de la formation : front → mid → back.
 */
export const FORMATION = [
  {
    id: 'bonk-y-kong',
    ligne: 'Frontline',
    place: 'Devant, dans le couloir',
    mission: "Prendre l'aggro, bloquer le passage et encaisser ce qui devait tomber sur les deux autres.",
    verdict:
      "Le mur qui frappe. Aucune subtilité, aucune erreur possible : il tient la ligne pendant que les autres travaillent.",
  },
  {
    id: 'mais-oui-c-clerc',
    ligne: 'Midline',
    place: 'Juste derrière le barbare',
    mission: 'Buffer, soigner, dissiper — et taper quand personne n’a besoin de rien.',
    verdict:
      "Le pivot de l'équipe. Il transforme une team de 3 en team de 4 en couvrant seul le heal, le buff et une deuxième source d'AoE.",
  },
  {
    id: 'magicienne-girl',
    ligne: 'Backline',
    place: 'En hauteur, hors de portée',
    mission: 'Supprimer la moitié du combat au premier tour et couper les sorts adverses.',
    verdict:
      "Le bouton « fin du combat ». Fragile, exigeante en placement, mais aucune autre fiche ne supprime autant de menaces en un tour.",
  },
]

/** Synergies : ce que la formation gagne en jouant les trois ensemble. */
export const SYNERGIES = [
  "Le barbare fixe les mêlées dans un goulot : la magicienne pose ses AoE sans toucher l'équipe.",
  'Haste du clerc sur le barbare double les attaques de la seule cible que les ennemis peuvent atteindre.',
  "Counterspell de la magicienne protège la concentration du clerc, qui protège l'équipe entière.",
  "Trois sources de dégâts de zone : peu d'ennemis survivent à deux tours de préparation.",
]

/** « Quelle compo pour quel style ? » — orientation par tempérament de joueur. */
export const STYLES = [
  {
    titre: 'Je veux appuyer sur un bouton',
    icone: '🪨',
    build: 'bonk-y-kong',
    texte:
      "Rage, Reckless Attack, avancer. BONK-Y-KONG se pilote sans réfléchir et pardonne les erreurs : c'est la fiche à prendre quand on découvre le jeu ou qu'on joue en soirée.",
  },
  {
    titre: 'Je veux gérer l’équipe',
    icone: '⚔️',
    build: 'mais-oui-c-clerc',
    texte:
      "Chaque tour est un arbitrage : soigner, buffer ou taper. MAIS OUI C CLERC récompense ceux qui aiment lire le combat avant d'agir — et il tient debout en première ligne.",
  },
  {
    titre: 'Je veux faire exploser des chiffres',
    icone: '💥',
    build: 'magicienne-girl',
    texte:
      "Positionnement, gestion des slots, timing de Counterspell. MAGICIENNE GIRL demande de la rigueur et rend le plus gros burst du jeu en échange.",
  },
]
