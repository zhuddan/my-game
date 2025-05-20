import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './assets/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function setRealViewport() {
  const vw = window.innerWidth * 0.01
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vw', `${vw}px`)
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
setRealViewport()
