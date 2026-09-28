import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/space-grotesk/500.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Missing application root')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider><CartProvider>
        <App />
      </CartProvider></ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
