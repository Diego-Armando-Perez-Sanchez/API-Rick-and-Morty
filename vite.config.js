import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://diego-armando-perez-sanchez.github.io/API-Rick-and-Morty",
})
