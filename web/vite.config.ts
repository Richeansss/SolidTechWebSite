import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // или '0.0.0.0'
    // allowedHosts: ['solid-tech-tomsk.ru'],
    // hmr: {
    //   host: 'solid-tech-tomsk.ru',
    //   protocol: 'ws', // или 'wss' если HTTPS
    //   port: 5173
    // }
  },
})
