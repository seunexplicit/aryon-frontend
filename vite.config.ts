import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
})
