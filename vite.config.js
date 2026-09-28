import { defineConfig, loadEnv } from 'vite'
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
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['SMTP_USER', 'SMTP_PASS', 'RECIPIENT_EMAIL']) {
    if (!process.env[key] && env[key]) process.env[key] = env[key]
  }
  return {
  plugins: [react(), apiPlugin()],
  server: {
    port: 5173,
    open: false,
  },
  }
})
