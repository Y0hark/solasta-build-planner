const builds = [
  // ============================================================
  // BUILD 1 : BONK-Y-KONG
  // ============================================================
  {
    id: "bonk-y-kong",
    nom: "BONK-Y-KONG",
    icone: "🪨",
    classe: "Barbare",
    sousClasse: "Path of Stone",
    role: "Tank / DPS mêlée / Aimant à baffes",
    niveauPuissance: "Broken",
    difficulte: "Facile",
    note: 9.1,
    jeu: "Solasta: Crown of the Magister",
    couleurAccent: "red",
    resume:
      "Tank/damage sponge très durable, choix 2H vs shield, Reckless non-taunt et limites contre casters.",
    stats: { FOR: "16-17", DEX: "14", CON: "16", INT: "8", SAG: "10", CHA: "8" },
    statsAlternatives: {
      label: "Version bunker",
      FOR: "14-16",
      DEX: "14",
      CON: "16-17",
      INT: "8",
      SAG: "10-12",
      CHA: "8",
    },
    race: "Half-Orc (bonk) / Nain des collines (bunker) / Humain (fallback propre)",
    arme: "Greatsword / Greataxe (mode BONK) ou 1 main + bouclier (mode KONG WALL)",
    armure: "Armure intermédiaire tôt, puis comparaison DEX/CON/items vs sans armure",
    tailleEquipe: 3,
    composition: "MAIS OUI C CLERC (Battle Cleric) + MAGICIENNE GIRL DESTRUCTION DE FIAK (Shock Arcanist)",
    boucleDeJeu: "Rage → Reckless Attack → Bloquer l'accès → Absorber les coups → Frapper fort",
    aptitudesCles: [
      "Rage",
      "Reckless Attack",
      "Stone Resilience (niv 3)",
      "Strength from Within (niv 6)",
      "Feral Instinct (niv 7)",
      "Rock Solid (niv 10)",
      "Relentless Rage (niv 11)",
      "Last Stand (niv 14)",
    ],
    sortsCles: [],
    avantages: [
      "Excellent tank/damage sponge — absorbe la pression comme personne",
      "Très simple à piloter, aucun micro-management",
      "CON rend les saves solides via Strength from Within (niv 6)",
      "Rock Solid récompense le fait d'être encerclé (+1 AC par ennemi adjacent, max +4)",
      "Relentless Rage = assurance anti-wipe",
      "Synergie parfaite avec Battle Cleric + Wizard en team de 3",
    ],
    inconvenients: [
      "Reckless Attack n'est PAS une provocation garantie",
      "Sensible aux casters, sorts de contrôle et dégâts élémentaires",
      "Pas d'aura de Paladin, pas de smite, pas de Lay on Hands",
      "Très dépendant du bon usage de Rage/Reckless",
      "Moins efficace si mal positionné (ne protège pas le backline)",
    ],
    progression: [
      {
        niveau: 1,
        titre: "Le singe sort de la cage",
        acquis: ["Rage", "Proficiences martiales/simples", "Armure intermédiaire + bouclier", "Sauvegardes FOR + CON"],
        tactique: "Rage sur les vrais combats. Va au contact. Ne poursuis pas une cible si ça ouvre ton backline.",
      },
      {
        niveau: 2,
        titre: "Reckless Attack",
        acquis: ["Reckless Attack", "Danger Sense"],
        tactique: "Reckless quand enragé + capable d'encaisser. Évite si hors rage, low HP, ou si casters vont te punir.",
      },
      {
        niveau: 3,
        titre: "Path of Stone — Stone Resilience",
        acquis: ["Path of Stone", "Stone Resilience (PV temporaires = 2× bonus de maîtrise en fin de tour pendant rage)"],
        tactique: "Rage tôt, force les ennemis à venir, accepte de prendre les coups pour protéger Clerc/Magicien.",
      },
      {
        niveau: 4,
        titre: "Premier choix clé",
        acquis: ["ASI : +2 FOR (prioritaire)"],
        tactique: "FOR 18 pour rester menaçant. Si tu ne touches pas, les ennemis t'ignorent.",
      },
      {
        niveau: 5,
        titre: "Extra Attack — Gros powerspike",
        acquis: ["Extra Attack", "Mouvement amélioré"],
        tactique: "Routine : Rage → Coller cible dangereuse → Reckless si safe → Deux attaques → Bloquer chemin backline.",
      },
      {
        niveau: 6,
        titre: "Strength from Within",
        acquis: ["Strength from Within (mod CON remplace tout mod de sauvegarde s'il est meilleur)"],
        tactique: "CON devient quasi aussi importante que FOR. Tu peux t'exposer plus sereinement aux effets ennemis.",
      },
      {
        niveau: 7,
        titre: "Feral Instinct",
        acquis: ["Avantage sur l'initiative"],
        tactique: "Jouer tôt = se placer avant que le Magicien soit menacé, bloquer un choke, engager archers/casters.",
      },
      {
        niveau: 8,
        titre: "Deuxième choix clé",
        acquis: ["+2 FOR → FOR 20, ou +2 CON si déjà item FOR"],
        tactique: "Sans item FOR → FOR 20. Avec item FOR fort → CON. Très haute difficulté → CON acceptable.",
      },
      {
        niveau: 9,
        titre: "Brutal Critical",
        acquis: ["Brutal Critical", "Dégâts de rage améliorés"],
        tactique: "Avec Reckless, tu vois plus de critiques qu'un martial normal. Continue la routine.",
      },
      {
        niveau: 10,
        titre: "Rock Solid",
        acquis: ["Rock Solid (+1 AC par ennemi hostile visible adjacent, max +4 pendant rage)"],
        tactique: "Plus t'es encerclé, plus ton AC monte. Mais attention aux sorts AoE et dégâts élémentaires.",
      },
      {
        niveau: 11,
        titre: "Relentless Rage",
        acquis: ["Relentless Rage (si 0 HP pendant rage → jet CON pour rester à 1 HP)"],
        tactique: "Joue plus agressif mais pas stupide. C'est une assurance, pas un plan de soin.",
      },
      {
        niveau: 12,
        titre: "Stabilisation fin de campagne",
        acquis: ["+2 CON recommandé"],
        tactique: "Path of Stone adore CON. Si FOR 20 → CON.",
      },
      {
        niveau: 14,
        titre: "Last Stand (Palace of Ice)",
        acquis: ["Last Stand (ajoute bonus de maîtrise aux dégâts de toutes les attaques de mêlée)"],
        tactique: "Tank qui tape très correctement. Combo avec Extra Attack + Reckless + rage + buffs.",
      },
    ],
    noteFinale:
      "BONK-Y-KONG n'est pas subtil mais il fait exactement ce qu'une team de 3 veut d'un frontliner : il arrive vite, il rage, il attire les baffes, il refuse de mourir, il tape assez fort pour qu'on ne puisse pas l'ignorer, et il donne au Battle Cleric et au Wizard le temps de gagner le combat.",
    sections: [
      {
        id: "synthese",
        titre: "Synthèse rapide",
        contenu: `| Élément | Recommandation |
|---------|---------------|
| Classe | Barbarian |
| Primal Path | Path of Stone |
| Rôle | Main tank / DPS mêlée / Aimant à baffes |
| Power level | Broken en tanking, Très fort en DPS |
| Difficulté | Facile |
| Arme | Greatsword / Greataxe ou 1 main + bouclier |
| Armure | Medium armor early, puis optimisé |
| Stat principale | FOR |
| Stats secondaires | CON, DEX |
| Style de jeu | Rage, Reckless Attack, bloquer, absorber, frapper |`,
      },
      {
        id: "pourquoi",
        titre: "Pourquoi c'est aussi solide",
        contenu: `Barbarian est déjà naturellement très tanky : rage (réduction dégâts physiques), gros hit die, Reckless Attack (attire l'attention), Extra Attack niv 5, Feral Instinct niv 7, Relentless Rage niv 11.

Path of Stone ajoute :
- **Stone Resilience (niv 3)** : PV temporaires = 2× bonus de maîtrise à la fin de ton tour pendant la rage
- **Strength from Within (niv 6)** : ton mod CON peut remplacer n'importe quel mod de sauvegarde s'il est meilleur
- **Rock Solid (niv 10)** : +1 AC par ennemi hostile adjacent (max +4) pendant la rage
- **Last Stand (niv 14)** : bonus de maîtrise ajouté aux dégâts de toutes tes attaques de mêlée

Traduction : plus le jeu essaye de te tuer, plus tu deviens rentable.`,
      },
      {
        id: "core",
        titre: "Core build",
        contenu: `- FOR 16+ pour rester menaçant
- CON 16 très recommandé : PV, saves, features Path of Stone
- DEX 14 pour armure intermédiaire / initiative / compétences
- Rage sur les vrais combats, pas sur les trashs
- Reckless Attack comme outil de hit chance et d'aggro indirecte
- Great weapon quand la team est stable ; bouclier quand il faut vraiment tanker
- Perception / Athlétisme sur le perso devant

Ce build remplace très bien un Paladin comme frontline, mais ne remplace pas l'aura, le smite ou Lay on Hands.`,
      },
      {
        id: "race",
        titre: "Race / Origine",
        contenu: `**Option A — Half-Orc** : meilleur fantasy bonk, très bon profil martial, thématique parfaite.
**Option B — Nain des collines** : version bunker, CON/PV très confortables, synergie directe Path of Stone.
**Option C — Humain** : point buy propre, spread équilibré, facile d'avoir FOR/DEX/CON corrects.

Pour team de 3 safe clear : **Half-Orc** si Battle Cleric est là ; **Nain** si très haute difficulté.`,
      },
      {
        id: "arme",
        titre: "Arme / Style",
        contenu: `**Mode BONK — Greatsword / Greataxe** : meilleur fantasy, gros dégâts, profite bien de Reckless. À utiliser quand le Clerc peut te maintenir et que le Magicien contrôle bien.

**Mode KONG WALL — 1 main + bouclier** : plus d'AC, très stable, excellent en Cataclysm ou sans Paladin. À utiliser pour tenir un choke ou quand Clerc + Magicien font déjà les dégâts.

Ne choisis pas une arme par ego. Choisis selon le combat.`,
      },
      {
        id: "feats",
        titre: "Feats / ASI",
        contenu: `- **Niveau 4** : +2 FOR (prioritaire)
- **Niveau 8** : +2 FOR → FOR 20 (ou CON si item FOR)
- **Niveau 12** : +2 CON (ou feat défensif type Enduring Body)
- **Niveau 16** (Palace of Ice) : continuer CON / feat offensif`,
      },
      {
        id: "tactiques",
        titre: "Règles tactiques",
        contenu: `1. **Tu n'es pas juste un DPS** — ton job est de prendre l'espace
2. **Reckless Attack est aussi une provocation** — les ennemis aiment toucher, donne-leur avantage contre toi
3. **Rage doit être rentable** — pas sur deux rats
4. **Rock Solid récompense le bon placement** — au niv 10, être encerclé peut être bon
5. **Attention aux dégâts magiques** — colle les casters, force concentration, demande Counterspell
6. **Haste sur Barbare est violent** — mais si Haste tombe, tu perds un tour`,
      },
      {
        id: "erreurs",
        titre: "Erreurs à éviter",
        contenu: `1. Vouloir être un Paladin — tu gagnes autrement
2. Dump CON — sur Path of Stone c'est criminel
3. Courir hors position pour tuer un trash
4. Reckless hors rage sans réfléchir
5. Ignorer les casters — mets-leur la pression
6. Oublier le bouclier comme option
7. Croire que Path of Stone résout les casters — Strength from Within aide les saves mais ne résout pas tout`,
      },
      {
        id: "composition",
        titre: "Composition idéale",
        contenu: `Team de 3 safe clear :
- 🪨 **BONK-Y-KONG** — Barbarian Path of Stone
- ⚔️ **MAIS OUI C CLERC** — Battle Cleric
- 💥 **MAGICIENNE GIRL DESTRUCTION DE FIAK** — Wizard Shock Arcanist

C'est la meilleure alternative non-Paladin. Barbare bloque, Clerc heal/buff/blast, Magicien rase l'écran.`,
      },
      {
        id: "checklist",
        titre: "Checklist avant gros combat",
        contenu: `- [ ] Assez de rages restantes ?
- [ ] Fight qui mérite rage T1 ?
- [ ] Cible la plus dangereuse pour le backline identifiée ?
- [ ] Choke blocable ?
- [ ] Clerc peut suivre/voir ?
- [ ] Magicien a besoin d'espace pour Fireball ?
- [ ] Great weapon ou shield ?
- [ ] Reckless attire les bons ennemis ?
- [ ] Caster à coller immédiatement ?`,
      },
    ],
  },

  // ============================================================
  // BUILD 2 : MAIS OUI C CLERC
  // ============================================================
  {
    id: "mais-oui-c-clerc",
    nom: "MAIS OUI C CLERC",
    icone: "⚔️",
    classe: "Clerc",
    sousClasse: "Battle Domain",
    role: "Frontline caster / Off-tank / Healer / Buffer / AoE",
    niveauPuissance: "Broken",
    difficulte: "Moyen",
    note: 9.3,
    jeu: "Solasta: Crown of the Magister",
    couleurAccent: "yellow",
    resume:
      "Support/blaster frontline très fort, Fireball et Haste via Battle Domain, Herald of Battle pour booster les alliés adjacents.",
    stats: { FOR: "14-16", DEX: "10-12", CON: "16", INT: "8", SAG: "16", CHA: "8-10" },
    statsAlternatives: {
      label: "Version Humain polyvalent",
      FOR: "16",
      DEX: "14",
      CON: "12-14",
      INT: "8-10",
      SAG: "16",
      CHA: "8-10",
    },
    race: "Humain (équilibré) / Nain des collines (safe) / Demi-elfe (compétences)",
    arme: "1 main + bouclier (obligatoire)",
    armure: "Armure intermédiaire + DEX 14 en baseline ; armure lourde si le gain d'AC vaut le feat",
    tailleEquipe: 3,
    composition: "BONK-Y-KONG (Barbare) + MAGICIENNE GIRL DESTRUCTION DE FIAK (Shock Arcanist)",
    boucleDeJeu: "Garder concentration → Coller au front → Buff (Bless/Haste) → Punir (Fireball/Spirit Guardians) → Heal d'urgence (Healing Word)",
    aptitudesCles: [
      "Armes martiales",
      "Divine Fortitude (PV temporaires)",
      "Battle Magic (caster avec arme/bouclier)",
      "Decisive Strike (Channel Divinity : dégâts + stun)",
      "Herald of Battle niv 6 (+1 attaque/dégâts/AC/saves aux alliés adjacents)",
      "Scholar of Battle niv 8 (attaque supplémentaire)",
    ],
    sortsCles: [
      "Bless",
      "Healing Word",
      "Magic Missile (domaine)",
      "Aid",
      "Spirit Guardians",
      "Revivify",
      "Dispel Magic",
      "Fireball (domaine niv 5)",
      "Haste (domaine niv 5)",
      "Death Ward",
      "Hold Monster (domaine niv 9)",
      "Mass Cure Wounds",
    ],
    avantages: [
      "Couvre tank + heal + buff + AoE + contrôle en un seul slot",
      "Fireball ET Haste via Battle Domain = powerspike massif niv 5",
      "Herald of Battle cumulable avec aura Paladin, Bless, Haste",
      "Peut frontliner, blaster ou support selon le combat",
      "Scholar of Battle (niv 8) donne une 2e attaque, viable en mêlée",
      "Excellent en difficulté élevée : réduit tous les risques",
    ],
    inconvenients: [
      "Concentration critique : beaucoup de sorts sont concentration",
      "Action economy tendue : heal, buff, blast, mêlée — pas tout au même tour",
      "Moins bon qu'un vrai martial pour tenir SEUL toute la ligne",
      "Dépend des slots : doit économiser sur les combats triviaux",
      "Ne remplace pas totalement un tank si joué comme seul frontliner permanent",
    ],
    progression: [
      {
        niveau: 1,
        titre: "Le socle",
        acquis: ["Sorts de Clerc", "Battle Domain", "Armes martiales", "Divine Fortitude", "Battle Magic", "Magic Missile & Shield of Faith (domaine)"],
        tactique: "Bless sur les 2-3 meilleurs attaquants. Healing Word uniquement pour relever. Magic Missile pour finir une cible.",
      },
      {
        niveau: 2,
        titre: "Channel Divinity",
        acquis: ["Canalisation d'énergie divine", "Decisive Strike (dégâts + stun sur attaque réussie)"],
        tactique: "Decisive Strike si cible dangereuse et toucher réussi. Sinon, Bless/Healing Word/Guiding Bolt reste prioritaire.",
      },
      {
        niveau: 3,
        titre: "Sorts niveau 2",
        acquis: ["Acid Arrow & Flaming Sphere (domaine)", "Aid, Lesser Restoration"],
        tactique: "Aid avant zones dangereuses. Flaming Sphere si combat long.",
      },
      {
        niveau: 4,
        titre: "Premier ASI",
        acquis: ["+2 SAG → SAG 18"],
        tactique: "SAG améliore tout : spell attack, DC, sorts préparés, impact global.",
      },
      {
        niveau: 5,
        titre: "GROS POWERSPIKE — Fireball + Haste",
        acquis: ["Fireball & Haste (domaine)", "Spirit Guardians", "Revivify", "Dispel Magic"],
        tactique: "Plan A : Fireball sur pack. Plan B : Spirit Guardians au front. Plan C : Haste sur le martial carry (attention concentration !).",
      },
      {
        niveau: 6,
        titre: "Herald of Battle",
        acquis: ["Herald of Battle (+1 attaque/dégâts/AC/saves aux alliés adjacents)"],
        tactique: "Place-toi adjacent au tank principal. Formation : [Tank] [Clerc] ——— [Magicien].",
      },
      {
        niveau: 7,
        titre: "Sorts niveau 4",
        acquis: ["Stoneskin & Phantasmal Killer (domaine)", "Death Ward", "Freedom of Movement", "Banishment si dispo"],
        tactique: "Death Ward avant combats à risque sur le perso le plus exposé.",
      },
      {
        niveau: 8,
        titre: "Scholar of Battle + Choix",
        acquis: ["Scholar of Battle (attaque supp. sur Attack/Shove)", "ASI : Flawless Concentration ou +2 SAG → 20"],
        tactique: "Difficulté élevée → Flawless Concentration. Sinon → SAG 20. Ne joue pas Fighter, tu restes un Clerc.",
      },
      {
        niveau: 9,
        titre: "Sorts niveau 5",
        acquis: ["Hold Monster & Insect Plague (domaine)", "Greater Restoration", "Mass Cure Wounds", "Raise Dead"],
        tactique: "Hold Monster sur cible dangereuse. Insect Plague pour contrôle de zone. Raise Dead sécurise la campagne.",
      },
      {
        niveau: 10,
        titre: "Intervention divine",
        acquis: ["Intervention divine (chance faible mais fight-changing)"],
        tactique: "Stabiliser SAG 20, monter CON, améliorer concentration, chercher items défensifs.",
      },
    ],
    noteFinale:
      "Le Battle Cleric est aussi fort parce qu'il gagne des options. Combat facile → il économise et tank. Combat dangereux → il peut sauver un allié, rez, dispel, buffer, lancer Fireball, lancer Haste, tenir la frontline, booster les alliés adjacents. C'est exactement le type de build qui rend une team de 3 beaucoup plus stable.",
    sections: [
      {
        id: "synthese",
        titre: "Synthèse rapide",
        contenu: `| Élément | Recommandation |
|---------|---------------|
| Classe | Cleric |
| Domaine | Battle Domain |
| Rôle | Frontline caster / Off-tank / Healer / Buffer / AoE |
| Power level | Broken |
| Difficulté | Facile à moyen |
| Arme | 1 main + bouclier |
| Armure | Medium early, Heavy si feat |
| Stat principale | SAG |
| Stats secondaires | CON, FOR |
| Style | Garder concentration, coller au front, buff puis punir |`,
      },
      {
        id: "pourquoi",
        titre: "Pourquoi c'est aussi efficace",
        contenu: `Le Battle Domain donne au Clerc ce qui lui manque : des sorts de Magicien très offensifs et des outils martiaux.

Sorts de domaine toujours préparés :
- Niv 1 : **Magic Missile**, **Shield of Faith**
- Niv 3 : **Acid Arrow**, **Flaming Sphere**
- Niv 5 : **Fireball**, **Haste**
- Niv 7 : **Stoneskin**, **Phantasmal Killer**
- Niv 9 : **Hold Monster**, **Insect Plague**

Plus : armes martiales, Battle Magic (caster avec arme+bouclier), Decisive Strike (dégâts + stun), Herald of Battle (+1 attaque/dégâts/AC/saves aux alliés adjacents niv 6), Scholar of Battle (attaque supp. niv 8).

Ce n'est pas « un healer qui tape ». C'est un tank-support-blaster.`,
      },
      {
        id: "core",
        titre: "Core build",
        contenu: `- SAG 16 minimum, idéalement 18 tôt
- CON 14 minimum, 16 si team de 3
- Bouclier + armure intermédiaire en baseline
- Bless, Healing Word, Aid, Spirit Guardians, Revivify, Dispel Magic en rotation
- Fireball et Haste via Battle Domain = powerspike niv 5
- Herald of Battle niv 6 : adjacent au frontliner
- Flawless Concentration devient sérieux si frontline maintenue`,
      },
      {
        id: "race",
        titre: "Race / Origine",
        contenu: `**Option A — Humain** : +1 partout, point-buy très propre, le plus équilibré.
**Option B — Nain des collines** : bonus CON + SAG, PV supplémentaires, le plus safe en team réduite.
**Option C — Demi-elfe** : flexibilité, compétences supplémentaires, couvre les trous du groupe.

Pour team de 3 : **Humain** pour le build le plus propre ; **Nain des collines** pour maximiser la sécurité.`,
      },
      {
        id: "sorts",
        titre: "Sorts préparés — liste pratique",
        contenu: `**Early game** : Bless, Healing Word, Cure Wounds, Guiding Bolt, Detect Magic, Shield of Faith (domaine), Magic Missile (domaine)

**Mid game** : Aid, Lesser Restoration, Revivify, Dispel Magic, Spirit Guardians, Mass Healing Word, Fireball (domaine), Haste (domaine)

**Late game** : Death Ward, Freedom of Movement, Greater Restoration, Mass Cure Wounds, Raise Dead, Hold Monster (domaine), Insect Plague (domaine)`,
      },
      {
        id: "feats",
        titre: "Feats / ASI",
        contenu: `- **Niveau 4** : +2 SAG → SAG 18
- **Niveau 8** : Flawless Concentration (si frontline/concentration contestée) ou +2 SAG → SAG 20
- **Niveau 12** : finir SAG 20 ou booster CON

Ne prends pas FOR d'abord. La mêlée est un plan B, pas ta source de valeur principale avant Scholar of Battle.`,
      },
      {
        id: "tactiques",
        titre: "Règles tactiques",
        contenu: `1. **Healing Word > Cure Wounds en urgence** — à distance, action bonus, le bouton anti-wipe
2. **Bless est meilleur qu'il n'en a l'air** — sur team de 3, il touche toute l'équipe
3. **Haste est puissant mais dangereux** — si tu perds concentration, l'allié perd un tour
4. **Fireball est de la prévention de dégâts** — tuer 2-3 ennemis T1 évite beaucoup de dégâts futurs
5. **Spirit Guardians = zone de mort** — si les ennemis doivent venir à toi
6. **Garde un slot de secours** — ne finis jamais sans Healing Word, Revivify, Dispel Magic`,
      },
      {
        id: "erreurs",
        titre: "Erreurs à éviter",
        contenu: `1. Jouer comme un healer passif — tu dois PRÉVENIR les dégâts avec Fireball, Spirit Guardians, Bless, Haste
2. Jouer comme un Fighter pur — tes slots sont ce qui rend le build aussi fort
3. Trop dépendre de Haste — parfois Bless ou Spirit Guardians sont plus fiables
4. Oublier Dispel Magic / Revivify — ces sorts gagnent des runs
5. Mauvais placement Herald of Battle — joue adjacent au frontliner dès le niv 6
6. Croire que le Clerc remplace totalement un tank — il est meilleur en off-tank support/blaster`,
      },
      {
        id: "composition",
        titre: "Composition idéale",
        contenu: `Team de 3 safe clear :
- 🪨 **BONK-Y-KONG** — Barbare Path of Stone (frontline)
- ⚔️ **MAIS OUI C CLERC** — Battle Cleric (midline)
- 💥 **MAGICIENNE GIRL DESTRUCTION DE FIAK** — Magicien Shock Arcanist (backline)

Avec Paladin : empile Aura of Protection + Herald of Battle + Bless + Haste. Avec Barbare : très simple, Barbare bloque, Clerc buff/blast. Avec Fighter Mountaineer : gros mur défensif, Clerc maintient, Magicien nettoie.`,
      },
      {
        id: "checklist",
        titre: "Checklist avant gros combat",
        contenu: `- [ ] Aid actif ?
- [ ] Au moins un slot pour Healing Word ?
- [ ] Revivify préparé ?
- [ ] Dispel Magic préparé ?
- [ ] Combat pack → Fireball / Spirit Guardians ?
- [ ] Boss → Haste / Bless / Guiding Bolt ?
- [ ] Adjacent au frontliner pour Herald of Battle ?
- [ ] Concentration protégée ?`,
      },
    ],
  },

  // ============================================================
  // BUILD 3 : MAGICIENNE GIRL DESTRUCTION DE FIAK
  // ============================================================
  {
    id: "magicienne-girl",
    nom: "MAGICIENNE GIRL DESTRUCTION DE FIAK",
    icone: "💥",
    classe: "Magicien",
    sousClasse: "Shock Arcanist",
    role: "Nuker / AoE blaster / Contrôleur / Anti-caster",
    niveauPuissance: "Broken",
    difficulte: "Technique",
    note: 9.1,
    jeu: "Solasta: Crown of the Magister",
    couleurAccent: "purple",
    resume:
      "Nuker avec INT/CON, Fireball, Counterspell et Arcane Fury. Sorts high-level et Arcane Shock à vérifier en jeu.",
    stats: { FOR: "8", DEX: "14-16", CON: "14-16", INT: "16", SAG: "10-12", CHA: "8" },
    race: "Haut-elfe / Elfe sylvain (DEX/INT) / Humain (équilibré) / Nain des collines (bunker)",
    arme: "Cantrips + sorts, dague/bâton (secondaire)",
    armure: "Pas d'armure : Mage Armor + Shield + placement",
    tailleEquipe: 3,
    composition: "BONK-Y-KONG (Barbare) + MAIS OUI C CLERC (Battle Cleric)",
    boucleDeJeu: "High ground → Contrôle ou nuke T1 → Garder Shield/Counterspell → Burst sous Arcane Fury → Survivre grâce à Misty Step",
    aptitudesCles: [
      "Arcane Recovery",
      "Arcane Warfare niv 2 (sorts de la War list castés un niveau au-dessus)",
      "Arcane Fury niv 6 (+bonus maîtrise + mod INT aux dégâts d'évocation)",
      "Arcane Shock niv 10 (overcharge, dégâts au-dessus de la moyenne)",
      "Greater Arcane Shock niv 14 (overcharge ultime, dégâts max)",
    ],
    sortsCles: [
      "Mage Armor",
      "Shield",
      "Magic Missile",
      "Misty Step",
      "Scorching Ray",
      "Fireball",
      "Counterspell",
      "Fly",
      "Lightning Bolt",
      "Haste",
      "Dispel Magic",
      "Wall of Fire",
      "Cone of Cold",
      "Banishment",
      "Chain Lightning",
      "Disintegrate",
    ],
    avantages: [
      "Meilleur burst damage du jeu grâce à Arcane Warfare + Arcane Fury",
      "Fireball casté comme un niveau au-dessus dès le niv 5",
      "Counterspell + Dispel Magic = contrôle total des casters adverses",
      "Misty Step + Shield + Mage Armor = kit de survie complet",
      "Peut pivoter entre nuke, contrôle, buff et utility selon le combat",
      "Arcane Shock / Greater Arcane Shock = boss killer ultime",
    ],
    inconvenients: [
      "Fragile si mal positionné — une erreur de placement = mort",
      "Dépend des slots : ne pas overkill les combats faciles",
      "La concentration peut être volée si mal protégée",
      "Pas de heal, pas de rez — si le Clerc tombe, c'est fini",
      "Certains combos haut niveau dépendent de la disponibilité exacte des sorts",
      "Arcane Shock doit être vérifié sort par sort en jeu (pas tous compatibles)",
    ],
    progression: [
      {
        niveau: 1,
        titre: "Survivre, contrôler, finir",
        acquis: ["Mage Armor", "Shield", "Magic Missile", "Detect Magic", "Identify", "Sleep ou Thunderwave"],
        tactique: "Mage Armor avant zone dangereuse. Shield toujours dispo. Magic Missile pour finir une cible. Sleep très fort early.",
      },
      {
        niveau: 2,
        titre: "Shock Arcanist online",
        acquis: ["Arcane Recovery", "Arcane Warfare (sorts War list = +1 niveau de cast)"],
        tactique: "Magic Missile devient meilleur immédiatement. Cantrip si fight facile, Magic Missile si cible à finir.",
      },
      {
        niveau: 3,
        titre: "Sorts niveau 2",
        acquis: ["Misty Step (obligatoire)", "Scorching Ray", "Acid Arrow", "Invisibility ou Mirror Image"],
        tactique: "Misty Step sauve des runs. Si un ennemi arrive au contact → téléporte-toi, ne tanke pas.",
      },
      {
        niveau: 4,
        titre: "Premier ASI",
        acquis: ["+2 INT → INT 18"],
        tactique: "INT booste tout : spell attack, DC, sorts préparés, Arcane Fury.",
      },
      {
        niveau: 5,
        titre: "PREMIER BOUTON NUCLÉAIRE",
        acquis: ["Fireball", "Counterspell", "Lightning Bolt", "Haste", "Fly", "Dispel Magic"],
        tactique: "Plan A : Fireball sur pack (casté 1 niveau au-dessus grâce à Arcane Warfare). Plan B : Lightning Bolt si alignés. Plan C : Haste sur martial si concentration safe.",
      },
      {
        niveau: 6,
        titre: "Arcane Fury",
        acquis: ["Arcane Fury (1 min : +bonus maîtrise + mod INT aux dégâts d'évocation)"],
        tactique: "Active avant combat boss, gros pack, embuscade dangereuse. PAS sur combat trivial.",
      },
      {
        niveau: 7,
        titre: "Sorts niveau 4",
        acquis: ["Wall of Fire", "Banishment", "Greater Invisibility", "Black Tentacles", "Ice Storm"],
        tactique: "Wall of Fire pour couper une zone. Banishment pour transformer 4v3 en 3v3. Tu dictes la géométrie du combat.",
      },
      {
        niveau: 8,
        titre: "Deuxième ASI",
        acquis: ["+2 INT → INT 20"],
        tactique: "INT 20 d'abord (fiabilité + Arcane Fury). Alternative : Flawless Concentration si Cataclysm.",
      },
      {
        niveau: 9,
        titre: "Sorts niveau 5",
        acquis: ["Cone of Cold", "Mind Twist", "Hold Monster", "Cloudkill si dispo"],
        tactique: "Cone of Cold = nuke en cône. Hold Monster = boss trivial si ça passe.",
      },
      {
        niveau: 10,
        titre: "Arcane Shock",
        acquis: ["Arcane Shock (bonus action : overcharge, dégâts au-dessus de la moyenne, risque dégâts psy)"],
        tactique: "Pour boss et packs dangereux uniquement. Vérifie quels sorts sont compatibles en jeu.",
      },
      {
        niveau: 11,
        titre: "Sorts niveau 6",
        acquis: ["Chain Lightning", "Disintegrate", "Globe of Invulnerability si dispo", "Freezing Sphere"],
        tactique: "Chain Lightning contre groupes espacés. Disintegrate = bouton anti-cible prioritaire.",
      },
      {
        niveau: 12,
        titre: "Stabilisation",
        acquis: ["Flawless Concentration ou +2 CON ou feat défensif"],
        tactique: "INT 20 → concentration → CON → survie.",
      },
      {
        niveau: 14,
        titre: "Greater Arcane Shock",
        acquis: ["Greater Arcane Shock (bonus action : dégâts MAX, CON save DC 16, dégâts psy si échec)"],
        tactique: "Réservé aux boss et derniers combats. Combos : Arcane Shock + Chain Lightning / Cone of Cold / Disintegrate.",
      },
    ],
    noteFinale:
      "Shock Arcanist n'est pas le Magicien le plus polyvalent mais si la question est « Quel Magicien je prends pour tout exploser ? », la réponse est MAGICIENNE GIRL DESTRUCTION DE FIAK. Tu joues safe pendant les petits fights, tu gardes tes ressources, puis high ground, Arcane Fury, Fireball/Chain Lightning, Counterspell en réserve, et tu fais disparaître la moitié du problème avant que la frontline ait fini de courir.",
    sections: [
      {
        id: "synthese",
        titre: "Synthèse rapide",
        contenu: `| Élément | Recommandation |
|---------|---------------|
| Classe | Wizard |
| Tradition | Shock Arcanist |
| Rôle | Nuker / AoE blaster / Contrôleur / Anti-caster |
| Power level | Broken |
| Difficulté | Technique |
| Arme | Cantrips + sorts (dague/bâton secondaire) |
| Armure | Pas d'armure : Mage Armor + Shield + placement |
| Stat principale | INT |
| Stats secondaires | CON, DEX |
| Style | High ground, contrôle/nuke T1, Shield/Counterspell, burst Arcane Fury |`,
      },
      {
        id: "pourquoi",
        titre: "Pourquoi c'est aussi efficace",
        contenu: `Shock Arcanist ajoute une couche de dégâts absurde au Magicien :

- **Arcane Warfare (niv 2)** : sorts de la War list traités comme +1 niveau de cast
- **Arcane Fury (niv 6)** : +bonus maîtrise + mod INT aux dégâts d'évocation pendant 1 min
- **Arcane Shock (niv 10)** : bonus action, overcharge, dégâts au-dessus de la moyenne
- **Greater Arcane Shock (niv 14)** : dégâts MAX possibles

La War list inclut : Magic Missile, Burning Hands, Thunderwave, Acid Arrow, Scorching Ray, Flaming Sphere, **Fireball**, **Lightning Bolt**, Ice Storm, **Cone of Cold**, Mind Twist, **Disintegrate**, **Chain Lightning**, Freezing Sphere.

Le build transforme tes meilleurs sorts offensifs en versions surdopées.`,
      },
      {
        id: "core",
        titre: "Core build",
        contenu: `- INT 16 → 20 le plus vite possible
- CON 14 minimum, 16 fortement recommandé en team de 3
- DEX 14-16 pour AC/initiative
- Mage Armor + Shield + Misty Step = kit de survie obligatoire
- Fireball niv 5 : identité du build
- Counterspell : obligatoire dès que dispo
- Arcane Fury niv 6 : garder pour les vrais combats

Le build est un destructeur, mais ne doit jamais être joué full glass cannon.`,
      },
      {
        id: "race",
        titre: "Race / Origine",
        contenu: `**Option A — Haut-elfe / Elfe sylvain** : bonus INT/DEX, darkvision, agilité. Le plus canonique.
**Option B — Humain** : spread équilibré, facile d'avoir INT 16 / CON 16 / DEX 14.
**Option C — Nain des collines** : version bunker, CON/PV confortables, viable en haute difficulté.

Pour team de 3 : **Humain ou Haut-elfe** pour l'optimisation standard. **Nain des collines** si le Magicien se fait souvent ouvrir.`,
      },
      {
        id: "spellbook",
        titre: "Spellbook recommandé par rôle",
        contenu: `**Défense / Survie** : Mage Armor, Shield, Misty Step, Mirror Image, Invisibility, Greater Invisibility, Dimension Door, Globe of Invulnerability

**Destruction** : Magic Missile, Burning Hands, Thunderwave, Scorching Ray, Acid Arrow, Fireball, Lightning Bolt, Ice Storm, Cone of Cold, Chain Lightning, Disintegrate

**Contrôle** : Sleep (early), Hold Person, Hypnotic Pattern, Black Tentacles, Banishment, Hold Monster, Wall of Fire, Mind Twist

**Utilitaire** : Detect Magic, Identify, Fly, Dispel Magic, Counterspell`,
      },
      {
        id: "feats",
        titre: "Feats / ASI",
        contenu: `- **Niveau 4** : +2 INT → INT 18
- **Niveau 8** : +2 INT → INT 20 (ou Flawless Concentration si Cataclysm)
- **Niveau 12** : Flawless Concentration ou +2 CON

INT 20 d'abord. Le Magicien qui rate ses saves ne sert à rien. Arcane Fury scale avec INT.`,
      },
      {
        id: "tactiques",
        titre: "Règles tactiques",
        contenu: `1. **High ground est un multiplicateur** — place-toi en hauteur
2. **Shield est ton armure réelle** — Mage Armor + DEX + Shield = difficile à toucher
3. **Misty Step est un bouton anti-mort** — ne négocie pas, téléporte-toi
4. **Fireball = prévention de dégâts** — tuer 2 ennemis T1 = healer préventivement l'équipe
5. **Counterspell gagne des combats** — un gros sort annulé > un Fireball parfois
6. **Ne double pas Haste avec ego** — si tu perds concentration, l'allié perd un tour
7. **Les gros boutons ont un coût** — Arcane Fury/Shock pour les vrais combats uniquement`,
      },
      {
        id: "erreurs",
        titre: "Erreurs à éviter",
        contenu: `1. Jouer full dégâts sans défense — un Magicien mort = 0 DPR
2. Oublier Mage Armor — différence entre « fragile » et « survivable »
3. Trop de sorts redondants — tu veux blast cercle, ligne, cône, single target, contrôle, défense, utility
4. Fireball sur 2 cibles médiocres — garde les slots pour les vrais swings
5. Ne pas prendre Counterspell — commence par empêcher l'ennemi de te détruire
6. Se placer comme un Archer tanky — ligne de vue oui, exposition non
7. Être le Haste bot si le Clerc peut le faire — le Magicien doit prioriser Fireball, Counterspell, contrôle`,
      },
      {
        id: "composition",
        titre: "Composition idéale",
        contenu: `Team de 3 destruction stable :
- 🪨 **BONK-Y-KONG** — Barbare Path of Stone (frontline)
- ⚔️ **MAIS OUI C CLERC** — Battle Cleric (midline)
- 💥 **MAGICIENNE GIRL DESTRUCTION DE FIAK** — Magicien Shock Arcanist (backline)

Avec Paladin : très safe, Aura of Protection + Haste sur Paladin. Avec Barbare : très simple, Barbare bloque, Magicien bombarde. Avec Fighter Mountaineer : Fighter tient le choke, Wall of Fire/Fireball derrière.`,
      },
      {
        id: "checklist",
        titre: "Checklist avant gros combat",
        contenu: `- [ ] Mage Armor actif ?
- [ ] Shield préparé ?
- [ ] Misty Step préparé ?
- [ ] Counterspell préparé si casters probables ?
- [ ] Fireball / Lightning Bolt / Cone of Cold prêt ?
- [ ] Ligne ou pack ?
- [ ] High ground disponible ?
- [ ] Fight qui mérite Arcane Fury ?
- [ ] Fight qui mérite Arcane Shock ?
- [ ] Qui doit être Hasté si concentration safe ?`,
      },
    ],
  },
];

export default builds;
