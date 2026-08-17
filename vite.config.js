import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Le site est publié sur https://Y0hark.github.io/solasta-build-planner/ :
// les assets doivent être préfixés par le nom du dépôt.
export default defineConfig({
  base: '/solasta-build-planner/',
  plugins: [react()],
})
