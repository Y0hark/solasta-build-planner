# Solasta Build Planner

3 builds. 1 équipe. 0 wipe.

Trois fiches de build détaillées pour *Solasta: Crown of the Magister*, pensées pour une
équipe réduite à trois personnages :

| Build | Classe | Note |
|-------|--------|------|
| 🪨 BONK-Y-KONG | Barbare — Path of Stone | 9.1 |
| ⚔️ MAIS OUI C CLERC | Clerc — Battle Domain | 9.3 |
| 💥 MAGICIENNE GIRL DESTRUCTION DE FIAK | Magicien — Shock Arcanist | 9.1 |

## Démarrer

```bash
npm install
npm run dev      # serveur de développement sur http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Stack

React 19 · Vite · Tailwind CSS 3 (via PostCSS) · React Router 7. JavaScript uniquement,
pas de TypeScript.

## Structure

```
src/
  App.jsx              routes + layout + transition de page
  main.jsx             point d'entrée (basename du routeur)
  index.css            directives Tailwind + styles « grimoire » + animations
  components/
    Navbar.jsx
    Footer.jsx
    BuildCard.jsx
    Grimoire.jsx       rendu Markdown des sections
    Revelation.jsx     apparition au scroll
    RetourEnHaut.jsx   bouton « ↑ » après 500px
  hooks/
    useRevelation.js   l'unique Intersection Observer du site
  lib/
    accents.js         palette par build (red / yellow / purple)
    formation.js       lecture « équipe » : lignes, synergies, verdicts
  data/
    builds.js          source de vérité des trois builds
  pages/
    Home.jsx           hero + cartes + section « L'équipe »
    Compare.jsx        tableau comparatif (/compare)
    BuildPage.jsx      fiche détaillée (/build/:id)
```

Les routes sont `/`, `/compare` et `/build/:id`. Toutes les données de build viennent de
`src/data/builds.js` : ajouter un build revient à ajouter une entrée dans ce tableau.

## Animations et accessibilité

Tout est en CSS (keyframes + transitions Tailwind), sans librairie d'animation. Le seul
JavaScript d'animation est `useRevelation`, un hook Intersection Observer qui révèle un
bloc une fois puis se débranche.

`prefers-reduced-motion: reduce` est respecté partout : les animations et transitions sont
neutralisées dans `src/index.css`, le hook révèle immédiatement le contenu, et le bouton
« retour en haut » remonte sans défilement animé. Les liens et boutons gardent un focus
visible (anneau doré) et le bouton flottant sort de l'ordre de tabulation tant qu'il est
invisible.

## Déploiement sur GitHub Pages

Le site est publié sur <https://Y0hark.github.io/solasta-build-planner/>.

```bash
npm run deploy
```

La commande enchaîne trois étapes :

1. `vite build` — build de production dans `dist/`. `vite.config.js` fixe
   `base: '/solasta-build-planner/'` pour que les assets soient servis depuis le
   sous-chemin du dépôt ; `main.jsx` passe la même valeur en `basename` au routeur.
2. `node scripts/pages-404.mjs` — copie `index.html` en `404.html`. GitHub Pages ne connaît
   pas les routes du client : sans ce repli, une visite directe sur `/compare` renverrait
   une vraie 404 au lieu de laisser React Router faire son travail.
3. `npx gh-pages -d dist` — pousse `dist/` sur la branche `gh-pages`.

Côté dépôt, une seule chose à régler la première fois : **Settings → Pages → Source →
Deploy from a branch → `gh-pages` / `(root)`**.

Attention en développement : comme `base` est renseigné, le serveur Vite sert le site sur
<http://localhost:5173/solasta-build-planner/> et non à la racine.
