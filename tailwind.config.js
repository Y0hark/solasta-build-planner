/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Encre et pierre : le fond du grimoire
        encre: '#07070b',
        obsidienne: '#0f1117',
        // Dorures : titres, filets, sceaux
        or: {
          100: '#f6e7b4',
          300: '#e8c66a',
          500: '#c9a227',
          700: '#8a6d18',
        },
        braise: '#8b3a1f',
        // Nuance absente de l'échelle Tailwind : lignes paires des tableaux
        slate: { 750: '#293548' },
      },
      fontFamily: {
        display: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        grimoire: ['"EB Garamond"', 'Georgia', 'serif'],
        rune: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        sceau: '0 0 0 1px rgba(201,162,39,0.25), 0 18px 40px -18px rgba(0,0,0,0.9)',
        halo: '0 0 40px -8px rgba(232,198,106,0.35)',
      },
      keyframes: {
        // Le sceau runique du hero tourne lentement, comme une mécanique d'horlogerie
        rotationLente: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        respiration: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
        montee: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        encreQuiSeRepand: {
          from: { opacity: '0', letterSpacing: '0.5em' },
          to: { opacity: '1', letterSpacing: '0.18em' },
        },
      },
      animation: {
        'rotation-lente': 'rotationLente 70s linear infinite',
        'rotation-inverse': 'rotationLente 110s linear infinite reverse',
        respiration: 'respiration 6s ease-in-out infinite',
        montee: 'montee 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        encre: 'encreQuiSeRepand 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
