import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Esta es la configuración base para el modo de desarrollo.
    base: '/', 
  }

  // Cuando ejecutas 'npm run build', se aplicará esta configuración.
  // Esto es perfecto para GitHub Pages.
  if (command === 'build') {
    config.base = '/serenly/'
  }

  return config
})