// Static prerender (SSG) for the homepage.
//
// Why this approach: the site is a single-component Vite + React 19 app with no
// router. The case-study, services, answers, and /es pages already ship as real
// static HTML from public/ (Vite copies them verbatim into dist/). The only route
// that shipped an empty <div id="root"> was "/". react-snap (Puppeteer) is fragile
// with React 19 hydration and this App's useEffect-driven DOM mutation, and
// vite-react-ssg would force a router rewrite. So we do a deterministic,
// headless-browser-free SSG: build a Node SSR bundle of src/entry-server.jsx,
// render <App/> to an HTML string, and inject it into the already-built
// dist/index.html. main.jsx then hydrates that markup in the browser.
//
// Run automatically as the build postbuild step (see package.json).

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SSR_OUT = join(ROOT, '.ssr-tmp');

const INDEX = join(DIST, 'index.html');
if (!existsSync(INDEX)) {
  console.error('[prerender] dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

// 1. Build a Node-targeted SSR bundle of the server entry.
await build({
  logLevel: 'warn',
  build: {
    ssr: join(ROOT, 'src/entry-server.jsx'),
    outDir: SSR_OUT,
    emptyOutDir: true,
    // We only need the render function; CSS is already in the client build.
    cssCodeSplit: false,
    rollupOptions: {
      output: { entryFileNames: 'entry-server.js' },
    },
  },
});

// 2. Import the built SSR module and render <App/> to an HTML string.
const { render } = await import(pathToFileURL(join(SSR_OUT, 'entry-server.js')).href);
const appHtml = render();

if (!appHtml || appHtml.length < 500) {
  console.error('[prerender] Rendered HTML is suspiciously short. Aborting so we never deploy an empty page.');
  console.error('[prerender] Got length:', appHtml ? appHtml.length : 0);
  process.exit(1);
}

// 3. Inject the rendered markup into the empty root div of the built index.html.
let html = readFileSync(INDEX, 'utf8');
const EMPTY_ROOT = '<div id="root"></div>';
if (!html.includes(EMPTY_ROOT)) {
  console.error('[prerender] Could not find empty <div id="root"></div> in dist/index.html.');
  process.exit(1);
}
html = html.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`);
writeFileSync(INDEX, html);

// 4. Clean up the temporary SSR bundle.
rmSync(SSR_OUT, { recursive: true, force: true });

const rootLen = appHtml.length;
console.log(`[prerender] Injected ${rootLen} chars of prerendered HTML into dist/index.html`);
