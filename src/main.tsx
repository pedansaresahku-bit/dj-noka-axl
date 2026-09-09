import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'lenis/dist/lenis.css'
import './index.css'
import { initSmoothScroll } from './utils/smoothScroll'

// Initialize physics-based Lenis smooth scrolling
initSmoothScroll();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

