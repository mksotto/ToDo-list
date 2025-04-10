import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ToDo-list/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace('/ToDo-list/api', ''),
      },
    },
  },
  base: "/ToDo-list",
})
