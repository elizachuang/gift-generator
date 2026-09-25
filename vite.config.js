import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // On GitHub Pages the site lives at /gift-generator/, so the deploy workflow sets BASE_PATH.
  // Locally (npm run dev / build) it stays at the root: /
  base: process.env.BASE_PATH || '/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
