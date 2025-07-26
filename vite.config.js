import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
      tailwindcss(),
    ],
  }

  if (command === 'build') {
    config.base = '/serenly/' // Nombre correcto del repo
  }

  return config
})