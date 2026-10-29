import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  server: { port: 5177 },
  preview: { port: 5177 },
})
