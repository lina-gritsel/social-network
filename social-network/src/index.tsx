import ReactDOM from 'react-dom/client'
import React from 'react'

import App from './App'
import '../src/i18next'

import './scss/styles.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </React.StrictMode>,
)
