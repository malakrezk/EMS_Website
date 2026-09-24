import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sendOrderHandler from './api/send-order.js'

function apiPlugin() {
  return {
    name: 'api-server-routes',
    configureServer(server) {
      server.middlewares.use('/api/send-order', (req, res) => {
        sendOrderHandler(req, res)
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 5173,
    open: true,
  },
})

