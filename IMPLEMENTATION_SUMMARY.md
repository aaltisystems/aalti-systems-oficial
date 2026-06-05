# IMPLEMENTATION SUMMARY — Bloque de Auditoría (2026-06-05)

Resumen de los cambios aplicados en este bloque de trabajo, lo que queda pendiente
de la auditoría y cómo probar el nuevo selector de idioma en local.

---

## ✅ Cambios aplicados en este bloque

### Paso 1 — Fixes críticos de auditoría
- **index.html**
  - `title` unificado con `og:title`: `AALTI SYSTEMS - Automatización B2B con IA | +40% Ventas 24/7`.
  - Eliminada la línea `hreflang="en"` (se reintroduce de forma coherente en el Paso 5).
  - `og:image` ya apuntaba a `https://aaltisystems.com/og-image.jpg` (sin cambios necesarios).
- **vercel.json**
  - Añadido `redirects`: `www.aaltisystems.com` → `aaltisystems.com` (permanente, 308).
  - Añadido `rewrites` SPA: todas las rutas "limpias" sirven `index.html`
    (`/((?!assets/|.*\..*).*)` — excluye `/assets/` y cualquier archivo con extensión,
    de modo que `favicon.svg`, `og-image.jpg`, `sitemap.xml`, etc. se siguen sirviendo estáticos).
  - Headers de cache existentes intactos.
- **public/robots.txt**
  - Eliminada la directiva inválida `Priority: 10` (y el bloque `Googlebot` que quedaba vacío).
  - Eliminada `Crawl-delay: 1` (Google la ignora).
- **public/sitemap.xml**
  - `lastmod` corregido de `2024-04-29` a `2026-06-05`.
  - Eliminadas las URLs de ancla (`#hero`, `#casos`, `#cta`); solo queda la URL raíz.
- **public/favicon.svg** y **public/apple-touch-icon.png**
  - Ya existían (favicon.svg resuelve el 404; apple-touch-icon.png es 180×180, fondo #030712). Sin acción.

### Paso 2 — Polaco en las traducciones
- **src/i18n.js** (archivo que usa realmente la app): añadido bloque `pl` completo (156 claves),
  espejo exacto de `en`. Corregido además un bug preexistente: `es.hero.ctaSecondary` faltaba
  solo en español (se añadió `"Ver Demo"` para que las 3 quedaran idénticas).
- **src/translations.js** (archivo plano, sin importadores actualmente): añadido bloque `pl` (84 claves).
- Terminología B2B profesional: `automatyzacja`, `sprzedaż`, `leadów`, `sztuczna inteligencja`.
- Números/estadísticas intactos (`+40%`, `500+`, `95%`, `20h`, `24/7`, `+30%`).
- `AALTI SYSTEMS` y términos de producto (`Lead Generation`, `Qualification`, `Closing`, `ROI`,
  `ML Engine`, `NLP`, `Enterprise Security`) sin traducir, igual que en `en`.

### Paso 3 — LanguageContext con 3 idiomas
- **src/LanguageContext.jsx**
  - Exporta `LANGUAGES = ['es', 'en', 'pl']`.
  - Estado inicial sigue siendo `es`; `localStorage` valida contra `LANGUAGES` (acepta `pl`).
  - `toggleLanguage` ahora cicla es → en → pl → es (conservado por compatibilidad).
  - El contexto expone `language`, `setLanguage`, `toggleLanguage`, `languages`.

### Paso 4 — Dropdown de idiomas en el navbar
- **src/App.jsx**
  - Nuevo componente `LanguageDropdown` con opciones 🇪🇸 ES / 🇬🇧 EN / 🇵🇱 PL.
  - Click abre un menú flotante; seleccionar cambia idioma y cierra el menú.
  - Cierre al hacer click fuera (`useEffect` + listener `mousedown` + `dropdownRef`).
  - Estilo coherente con el navbar (fondo `slate-950`, borde `indigo-500/30`, hover `indigo-500/20`, texto blanco).
  - Atributos ARIA (`role="listbox"/"option"`, `aria-expanded`, `aria-selected`) y check en el idioma activo.
  - Montado en desktop (reemplaza el antiguo botón `Globe`) y en el menú mobile (centrado, se abre hacia abajo,
    `max-w-[calc(100vw-2rem)]` para no salir del viewport).
  - Cableado: `Header` recibe `setLanguage`; `App` lo obtiene de `useLanguage()`. Import `Globe` eliminado.

### Paso 5 — hreflang y og:locale para polaco
- **index.html**
  - `<link rel="alternate" hreflang="pl" href="https://aaltisystems.com/pl/">`.
  - También reincorporado `hreflang="en"` (→ `/en/`) y añadido `hreflang="x-default"` para que la estructura
    SEO quede coherente con `og:locale:alternate` (es/en/pl).
  - `<meta property="og:locale:alternate" content="pl_PL">`.
  - Nota: `/pl/` y `/en/` son URLs **futuras**; los tags se añaden para preparar la estructura.

### Paso 6 — Verificación
- `npm run build` → **exit 0** (`✓ built` sin errores; único aviso: tamaño de chunk de three.js, preexistente).
- Paridad de claves verificada: **i18n.js** es=en=pl=**156**; **translations.js** es=en=pl=**84**. Sin claves huérfanas.
- Confirmado en el bundle compilado: las 3 banderas, `aria-label` del selector y strings polacas presentes.

---

## ✅ Bloque 2 — Limpieza estructural y pendientes resueltos

### GSAP/Lenis fuera del CDN (resuelto)
- **Hallazgo**: GSAP, ScrollTrigger y ScrollToPlugin se cargaban por `<script>` CDN render-blocking
  en `index.html` pero **no se usaban en ningún punto del código** (la app anima con `framer-motion`).
- **Acción**: eliminados los 3 scripts GSAP y el script inline de init de `index.html`.
  `Lenis` (smooth scroll, lo único realmente usado) migrado a **npm** (`lenis@^1.3.23`) e inicializado
  en `src/lib/smoothScroll.js`, conducido por `requestAnimationFrame` nativo (ya sin `gsap.ticker`).
  Se respeta `prefers-reduced-motion`. CSS oficial importado (`lenis/dist/lenis.css`).
- **Resultado**: `index.html` sin dependencias de CDN para JS (solo fuentes), sin scripts render-blocking.

### Code-splitting (resuelto)
- `vite.config.js` con `manualChunks`: `react-vendor`, `three`, `framer-motion` en chunks propios.
- **Chunk principal: 886 kB → 131 kB** (gzip 33.8 kB). Vendors cacheables por separado. Sin aviso de tamaño.

### Rutas `/en/` y `/pl/` funcionales en cliente (resuelto a nivel SPA)
- `src/LanguageContext.jsx` ahora resuelve el idioma desde el **path de la URL** (`/en/`, `/pl/`) en el
  primer render (prioridad: URL → localStorage → default `es`).
- Al cambiar idioma desde el dropdown se actualiza la URL con `history.pushState` (`/`, `/en/`, `/pl/`),
  se sincroniza `<html lang>` y se persiste en localStorage.
- Soporta back/forward del navegador (listener `popstate`).
- El `rewrite` SPA de `vercel.json` sirve `index.html` en esas rutas → un refresh en `/en/` o `/pl/` funciona.

### Refactor / estructura más limpia (parcial)
- `LanguageDropdown` extraído de `App.jsx` a `src/components/LanguageDropdown.jsx`
  (deriva sus opciones de `LANGUAGES`, evitando listas duplicadas). Import `ChevronDown` ya no
  contamina `App.jsx`.
- Nueva carpeta `src/lib/` para utilidades no-React (`smoothScroll.js`).

---

## ⏳ Pendiente real (queda fuera de este alcance por riesgo/tamaño)

- **SSR/SSG por idioma para SEO indexable**: las rutas `/en/` y `/pl/` ya sirven contenido localizado
  **en cliente**, pero el HTML inicial sigue siendo el mismo (ES) hasta que React hidrata. Para que los
  buscadores indexen versiones por idioma haría falta prerender/SSG (p. ej. `vite-plugin-ssr`/`react-router`
  + generación estática por locale). Es un cambio de arquitectura mayor.
- **Decomposición profunda de `App.jsx`**: sigue siendo un archivo grande (~1500 líneas) con muchas
  secciones inline. Conviene dividir Header, secciones (Hero, Bento, FAQ, etc.) y el sistema de "páginas"
  (hoy por estado `showX`) en módulos. Se hizo una extracción segura (LanguageDropdown); el resto se
  pospone porque requiere validación visual en navegador para evitar regresiones.
- **GDPR**: el `CookieBanner` es funcional y no se carga analítica real (no hay `gtag`), por lo que no hay
  tracking sin consentimiento. Mejora opcional: enlazar el banner a la Política de Privacidad y traducir
  banner/páginas legales a EN/PL.

---

## 🧪 Cómo probar el dropdown de idioma en local

```bash
npm install        # si es la primera vez
npm run dev        # arranca Vite (normalmente http://localhost:5173)
```

Luego, en el navegador:

1. **Desktop**: en la esquina superior derecha del navbar verás el selector con bandera + código
   (p. ej. `🇪🇸 ES`). Haz click → se abre el menú con las 3 opciones (🇪🇸 ES / 🇬🇧 EN / 🇵🇱 PL).
2. Selecciona **PL** → toda la interfaz cambia a polaco y el menú se cierra. El idioma activo muestra ✓.
3. **Click fuera** del menú abierto → se cierra sin cambiar el idioma.
4. **Persistencia**: recarga la página (F5). El idioma elegido se mantiene (guardado en `localStorage`
   bajo la clave `selectedLanguage`). Para resetear: `localStorage.removeItem('selectedLanguage')` en la consola.
5. **Mobile**: reduce la ventana al breakpoint móvil (< 768px), abre el menú hamburguesa (☰).
   El selector aparece centrado al final del panel y se abre hacia abajo sin salirse del viewport.

> Nota: el cambio de idioma es del lado cliente (no cambia la URL). Las URLs `/en/` y `/pl/`
> son parte de la estructura SEO futura aún pendiente de implementar (ver sección anterior).
