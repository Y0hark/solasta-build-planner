/**
 * Liens vers le wiki Solasta Fandom.
 *
 * Chaque clé est un terme susceptible d'apparaître dans le contenu des fiches
 * (src/data/builds.js). Le composant WikiTooltip s'en sert pour transformer
 * automatiquement ces termes en liens annotés vers le wiki.
 *
 * Trois règles pour éditer ce fichier :
 *   1. Une clé = un terme exact. La casse n'a pas d'importance au moment du
 *      repérage, mais l'orthographe si (accents, tirets, espaces).
 *   2. Pas de doublon : une clé écrite deux fois, c'est la dernière qui gagne
 *      silencieusement.
 *   3. La valeur est un constructeur de rubrique (`sort`, `classe`, `race`…)
 *      appelé avec le TITRE EXACT de la page wiki, plus une ancre de section
 *      facultative. Le titre du wiki n'est pas toujours celui du jeu :
 *        - le sort Shield est à « Shield (Spell) », l'armure à « Shield » ;
 *        - « Protection from Evil and Good » est à « Protect vs Evil & Good » ;
 *        - les races sont au pluriel (« Dwarves »), les sous-races sont des
 *          ancres de la page parente (« Dwarves#Hill_dwarves »).
 *      En cas de doute : https://solastacrownofthemagister.fandom.com/api.php
 *      ?action=query&format=json&titles=Le+Titre — un champ `missing` signale
 *      une page inexistante (le wiki affiche alors une page de création, pas
 *      une 404, donc le lien a l'air valide sans l'être).
 *
 * Le piège classique des homonymes se règle par la langue : le texte des fiches
 * dit « Bouclier » pour l'objet et « Shield » pour le sort.
 */

const wikiBase = 'https://solastacrownofthemagister.fandom.com/wiki'

/**
 * Fabrique un constructeur d'entrée pour une rubrique donnée.
 * `titre` est le titre exact de la page wiki, `ancre` la section visée.
 */
const rubrique = (nom) => (titre, ancre) => ({
  rubrique: nom,
  url: `${wikiBase}/${encodeURIComponent(titre.replace(/ /g, '_'))}${ancre ? `#${ancre}` : ''}`,
})

const sort = rubrique('Sort')
const classe = rubrique('Classe')
const sousClasse = rubrique('Sous-classe')
const aptitude = rubrique('Aptitude')
const race = rubrique('Race')
const don = rubrique('Don')
const regle = rubrique('Règle')
const arme = rubrique('Arme')
const armure = rubrique('Armure')
const extension = rubrique('Extension')
const difficulte = rubrique('Difficulté')

const wikiLinks = {
  // ==========================================
  // CLASSES
  // ==========================================
  Barbare: classe('Barbarians'),
  Barbarian: classe('Barbarians'),
  'Path of Stone': sousClasse('Barbarians', 'Path_of_Stone'),
  'Path of the Berserker': sousClasse('Barbarians', 'Path_of_the_Berserker'),
  'Path of the Magebane': sousClasse('Barbarians', 'Path_of_the_Magebane'),
  'Path of the Claw': sousClasse('Barbarians', 'Path_of_the_Claw_(Lost_Valley_DLC)'),

  Clerc: classe('Clerics'),
  Cleric: classe('Clerics'),
  'Battle Cleric': sousClasse('Clerics', 'Battle'),
  'Battle Domain': sousClasse('Clerics', 'Battle'),
  'Elemental Domain': sousClasse('Clerics', 'Elemental_(Fire)'),
  'Sun Domain': sousClasse('Clerics', 'Sun'),
  'Law Domain': sousClasse('Clerics', 'Law'),
  'Life Domain': sousClasse('Clerics', 'Life'),
  'Oblivion Domain': sousClasse('Clerics', 'Oblivion'),
  'Insight Domain': sousClasse('Clerics', 'Insight'),
  'Mischief Domain': sousClasse('Clerics', 'Mischief_(Lost_Valley_DLC)'),

  Magicien: classe('Wizards'),
  Magicienne: classe('Wizards'),
  Wizard: classe('Wizards'),
  'Shock Arcanist': sousClasse('Wizards', 'Shock_Arcanist'),
  Loremaster: sousClasse('Wizards', 'Loremaster'),
  Greenmage: sousClasse('Wizards', 'Greenmage'),
  'Court Mage': sousClasse('Wizards', 'Court_Mage_(Lost_Valley_DLC)'),

  Paladin: classe('Paladins'),
  'Paladin — Motherland': sousClasse('Paladins', 'Oath_of_Motherland'),
  'Motherland Paladin': sousClasse('Paladins', 'Oath_of_Motherland'),

  Fighter: classe('Fighters'),
  'Fighter Mountaineer': sousClasse('Fighters', 'Mountaineer'),
  Mountaineer: sousClasse('Fighters', 'Mountaineer'),

  Ranger: classe('Rangers'),
  Rogue: classe('Rogues'),
  Sorcerer: classe('Sorcerers'),
  Warlock: classe('Warlocks'),
  Druid: classe('Druids'),
  Monk: classe('Monks'),

  // ==========================================
  // RACES
  // Les sous-races sont des sections de la page de la race parente.
  // ==========================================
  'Half-Orc': race('Half-Orcs'),
  'Demi-orc': race('Half-Orcs'),
  Nain: race('Dwarves'),
  'Nain des collines': race('Dwarves', 'Hill_dwarves'),
  'Hill Dwarf': race('Dwarves', 'Hill_dwarves'),
  Dwarf: race('Dwarves'),
  Humain: race('Humans'),
  Human: race('Humans'),
  'Haut-elfe': race('Elves', 'High_elves'),
  'High Elf': race('Elves', 'High_elves'),
  'Elfe sylvain': race('Elves', 'Sylvan_elves'),
  'Sylvan Elf': race('Elves', 'Sylvan_elves'),
  'Demi-elfe': race('Half-Elves'),
  'Half-Elf': race('Half-Elves'),
  Dragonborn: race('Dragonborn'),
  Tieffelin: race('Tieflings'),
  Gnome: race('Gnomes'),
  Halfelin: race('Halflings'),
  Halfling: race('Halflings'),
  Darkvision: regle('Darkvision'),
  'Vision dans le noir': regle('Darkvision'),

  // ==========================================
  // APTITUDES DE CLASSE
  // Pas de page dédiée sur le wiki : on vise la section « Class Features » de
  // la classe, ou la sous-classe quand l'aptitude en vient.
  // ==========================================
  Rage: aptitude('Barbarians', 'Class_Features'),
  'Reckless Attack': aptitude('Barbarians', 'Class_Features'),
  'Danger Sense': aptitude('Barbarians', 'Class_Features'),
  'Relentless Rage': aptitude('Barbarians', 'Class_Features'),
  'Feral Instinct': aptitude('Barbarians', 'Class_Features'),
  'Brutal Critical': aptitude('Barbarians', 'Class_Features'),
  'Unarmored Defense': aptitude('Barbarians', 'Class_Features'),
  'Extra Attack': aptitude('Barbarians', 'Class_Features'),
  'Stone Resilience': aptitude('Barbarians', 'Path_of_Stone'),
  'Strength from Within': aptitude('Barbarians', 'Path_of_Stone'),
  'Rock Solid': aptitude('Barbarians', 'Path_of_Stone'),
  'Last Stand': aptitude('Barbarians', 'Path_of_Stone'),

  'Channel Divinity': aptitude('Clerics', 'Class_Features'),
  'Divine Fortitude': aptitude('Clerics', 'Class_Features'),
  'Divine Intervention': aptitude('Clerics', 'Class_Features'),
  'Battle Magic': aptitude('Clerics', 'Battle'),
  'Decisive Strike': aptitude('Clerics', 'Battle'),
  'Herald of Battle': aptitude('Clerics', 'Battle'),
  'Scholar of Battle': aptitude('Clerics', 'Battle'),

  'Arcane Recovery': aptitude('Wizards', 'Class_Features'),
  'Arcane Warfare': aptitude('Wizards', 'Shock_Arcanist'),
  'Arcane Fury': aptitude('Wizards', 'Shock_Arcanist'),
  'Arcane Shock': aptitude('Wizards', 'Shock_Arcanist'),
  'Greater Arcane Shock': aptitude('Wizards', 'Shock_Arcanist'),

  'Lay on Hands': aptitude('Paladins', 'Class_Features'),
  Smite: aptitude('Paladins', 'Class_Features'),
  'Divine Smite': aptitude('Paladins', 'Class_Features'),

  // ==========================================
  // SORTS
  // Une page par sort. Les niveaux de la page « Spells » servent de repli
  // quand le sort n'a pas (encore) sa page.
  // ==========================================
  Bless: sort('Bless'),
  'Healing Word': sort('Healing Word'),
  'Guiding Bolt': sort('Guiding Bolt'),
  'Cure Wounds': sort('Cure Wounds'),
  'Mage Armor': sort('Mage Armor'),
  Shield: sort('Shield (Spell)'), // le sort ; l'armure est sous « Bouclier »
  'Shield of Faith': sort('Shield of Faith'),
  'Magic Missile': sort('Magic Missile'),
  'Detect Magic': sort('Detect Magic'),
  Identify: sort('Identify'),
  Sleep: sort('Sleep'),
  Thunderwave: sort('Thunderwave'),
  'Burning Hands': sort('Burning Hands'),
  'Protection from Evil and Good': sort('Protect vs Evil & Good'),

  'Misty Step': sort('Misty Step'),
  'Scorching Ray': sort('Scorching Ray'),
  'Acid Arrow': sort('Acid Arrow'),
  'Flaming Sphere': sort('Flaming Sphere'),
  Aid: sort('Aid'),
  'Lesser Restoration': sort('Lesser Restoration'),
  'Spiritual Weapon': sort('Spiritual Weapon'),
  'Hold Person': sort('Hold Person'),
  Darkness: sort('Darkness'),
  Invisibility: sort('Invisibility'),
  'Mirror Image': sort('Spells', 'Level_II'), // pas de page dédiée
  'Find Traps': sort('Find Traps'),
  Blur: sort('Blur'),

  Fireball: sort('Fireball'),
  Haste: sort('Haste'),
  Counterspell: sort('Counterspell'),
  Fly: sort('Fly'),
  'Lightning Bolt': sort('Lightning Bolt'),
  Revivify: sort('Revivify'),
  'Dispel Magic': sort('Dispel Magic'),
  'Spirit Guardians': sort('Spirit Guardians'),
  'Mass Healing Word': sort('Mass Healing Word'),
  Daylight: sort('Daylight'),
  'Protection from Energy': sort('Protection from Energy'),
  'Hypnotic Pattern': sort('Hypnotic Pattern'),

  Stoneskin: sort('Stoneskin'),
  Banishment: sort('Banishment'),
  'Phantasmal Killer': sort('Phantasmal Killer'),
  'Death Ward': sort('Death Ward'),
  'Freedom of Movement': sort('Freedom of Movement'),
  'Wall of Fire': sort('Wall of Fire'),
  'Ice Storm': sort('Ice Storm'),
  'Guardian of Faith': sort('Guardian of Faith'),
  'Greater Invisibility': sort('Greater Invisibility'),
  'Black Tentacles': sort('Black Tentacles'),
  'Dimension Door': sort('Dimension Door'),

  'Cone of Cold': sort('Cone of Cold'),
  'Hold Monster': sort('Hold Monster'),
  'Insect Plague': sort('Insect Plague'),
  'Mass Cure Wounds': sort('Mass Cure Wounds'),
  'Greater Restoration': sort('Greater Restoration'),
  'Raise Dead': sort('Raise Dead'),
  'Flame Strike': sort('Flame Strike'),
  'Mind Twist': sort('Mind Twist'),
  Cloudkill: sort('Cloudkill'),

  'Chain Lightning': sort('Chain Lightning'),
  Disintegrate: sort('Disintegrate'),
  'Freezing Sphere': sort('Freezing Sphere'),
  'Incendiary Cloud': sort('Incendiary Cloud'),
  'Globe of Invulnerability': sort('Globe of Invulnerability'),
  'True Seeing': sort('True Seeing'),

  Concentration: regle('Concentration'),

  // ==========================================
  // FEATS
  // Pas de page par don : la liste complète est une section de « Feats ».
  // ==========================================
  'Flawless Concentration': don('Feats', 'List_of_feats'),
  'Enduring Body': don('Feats', 'List_of_feats'),
  Feats: don('Feats'),
  ASI: don('Feats'),

  // ==========================================
  // MÉCANIQUES DE JEU
  // ==========================================
  'Saving Throw': regle('Saving Throw'),
  'Jet de sauvegarde': regle('Saving Throw'),
  'Armor Class': regle('Armor Class'),
  'Proficiency Bonus': regle('Proficiency'),
  'Bonus de maîtrise': regle('Proficiency'),
  'Temporary HP': regle('Hit Points'),
  'PV temporaires': regle('Hit Points'),
  Advantage: regle('Advantage and Disadvantage'),
  Avantage: regle('Advantage and Disadvantage'),
  'Hit Die': regle('Hit Dice'),
  Initiative: regle('Initiative'),

  // ==========================================
  // ARMES / ÉQUIPEMENT
  // ==========================================
  Greatsword: arme('Greatsword'),
  Greataxe: arme('Greataxe'),
  'Martial Weapons': arme('Weapons', 'List_of_all_the_weapons_in_Solasta'),
  'Armes martiales': arme('Weapons', 'List_of_all_the_weapons_in_Solasta'),
  'Armure intermédiaire': armure('Armor', 'Medium_Armor'),
  'Medium Armor': armure('Armor', 'Medium_Armor'),
  'Armure lourde': armure('Armor', 'Heavy_Armor'),
  'Heavy Armor': armure('Armor', 'Heavy_Armor'),
  Bouclier: armure('Shield'), // l'objet ; le sort est sous « Shield »

  // ==========================================
  // DLC / CONTENU
  // ==========================================
  'Primal Calling': extension('Primal Calling'),
  'Lost Valley': extension('Lost Valley'),
  'Inner Strength': extension('Inner Strength'),
  'Palace of Ice': extension('Palace of Ice'),

  // ==========================================
  // DIFFICULTÉ / MODES
  // ==========================================
  Cataclysm: difficulte('Cataclysm'),
}

export default wikiLinks
