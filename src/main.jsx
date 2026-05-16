import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootEl = document.getElementById('root')

// The homepage is prerendered to static HTML at build time (see scripts/prerender.mjs).
// When that prerendered markup is present, hydrate it so the page is interactive
// without throwing away the server-rendered DOM. Otherwise fall back to a fresh
// client render (e.g. dev server, or if prerender is ever skipped).
if (rootEl.hasChildNodes()) {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
