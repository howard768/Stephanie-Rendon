import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Server entry used only at build time by scripts/prerender.mjs.
// App.jsx keeps all browser-only work (window, IntersectionObserver, scroll)
// inside useEffect, which does not run during renderToString, so this is safe.
export function render(language = 'en') {
  return renderToString(
    <StrictMode>
      <App language={language} />
    </StrictMode>,
  )
}
