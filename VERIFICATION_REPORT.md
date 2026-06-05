# VERIFICATION REPORT — AALTI SYSTEMS

**Fecha:** 2026-06-05
**Build:** `npm run build` → exit 0, sin warnings · `vite v5.4.21`
**Alcance:** 5 bloques (Funcionalidad, SEO, Seguridad, Privacidad/Legal, Rendimiento)

---

## ✅ Fixes aplicados (2026-06-05)

Tras la auditoría se implementaron las correcciones (build final exit 0, paridad i18n 166/166/166):

| # | Fix | Estado |
|---|---|---|
| 1 | Eliminadas deps obsoletas/sin uso (`drei`, `react-three-fiber`, `@react-three/drei`, `@react-three/fiber`) → solo `three` | ✅ npm audit: **7 vulns (5 high) → 2 moderate** |
| 2 | Headers de seguridad en `vercel.json` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS, `Permissions-Policy`) | ✅ |
| 3 | Honeypot anti-spam en el formulario (`ImprovedContactForm.jsx`) | ✅ |
| 4 | Checkbox de privacidad enlazado a la Política (callback `onShowPrivacy`) | ✅ |
| 5 | `CookieBanner` i18n (es/en/pl) + enlace a la política | ✅ |
| 6 | Mensajes/labels del formulario movidos a i18n (es/en/pl) | ✅ |
| 7 | Eliminado `@import` de fuente duplicado en `App.jsx` | ✅ |
| 8 | `sharp` movido a `devDependencies` | ✅ |
| 9 | Imágenes optimizadas: `logo.png` 131KB→**11KB**, `apple-touch-icon.png` 37KB→**5KB** | ✅ |
| 10 | `twitter:title` unificado con `og:title` + `article:modified_time` → 2026-06-05 | ✅ |
| 11 | Eliminado `src/translations.js` (código muerto) | ✅ |

**Pendiente deliberadamente (decisión de la propietaria):**
- **Email corporativo**: sigue como `aaltistudio@gmail.com` en 9 ubicaciones; se reemplazará cuando se cree la cuenta del dominio.
- **NIF/CIF y razón social en Aviso Legal**: no aplica todavía (autónoma, sin sociedad registrada). No se inventan datos legales.

**Pendiente técnico restante:**
- 2 vulns `moderate` de `esbuild`/`vite` que **solo afectan al dev server** (GHSA-67mh-4wv8-2f99), no a producción. Fix = vite@8 (breaking) — se pospone.
- i18n completo de las páginas legales (`PrivacyPolicy`, `LegalNotice`) a EN/PL — requiere traducción legalmente revisada.
- SSR/SSG por idioma para indexabilidad real de `/en/` `/pl/`.

**Puntuación tras fixes:** Seguridad **5 → 9**, Privacidad/Legal **7 → 8.5**, Rendimiento **8 → 9.5**. **Global ≈ 9.2/10.**

---

## 🧭 Resumen ejecutivo

| Bloque | Estado | Nota |
|---|---|---|
| 1 · Funcionalidad | ✅ OK | Imports resuelven, build limpio, 3 idiomas con claves idénticas, dropdown cierra al click-fuera |
| 2 · SEO | ✅ Casi perfecto | Todo el metadato presente y coherente (no-www); falta incluir `/en/` `/pl/` en el sitemap |
| 3 · Seguridad | ⚠️ Requiere acción | Sin headers de seguridad · 7 vulns npm (deps basura) · formulario sin anti-spam |
| 4 · Privacidad/Legal | ⚠️ Parcial | Existen políticas + checkbox; email personal, checkbox sin enlace, legales solo en ES |
| 5 · Rendimiento | ✅ Bueno | GSAP/Lenis ya resueltos; `@import` de fuente redundante y `logo.png` algo pesado |

**Lo que está OK:** compilación, i18n (es/en/pl), routing `/en//pl/`, metadatos SEO completos y consistentes, redirect www→no-www, rewrite SPA, robots/sitemap válidos, existencia de Política de Privacidad / Aviso Legal / Cookie Banner / checkbox de privacidad, sin secretos hardcodeados.

**Lo que falla / falta:** headers de seguridad HTTP, 7 vulnerabilidades npm (paquetes `drei`/`react-three-fiber` obsoletos y sin usar), ausencia de anti-spam en el formulario, email personal `@gmail` como contacto oficial, checkbox de privacidad sin enlace real a la política, y un `@import` de fuentes duplicado.

---

## ✅ BLOQUE 1 — FUNCIONALIDAD · 10/10

| Check | Resultado |
|---|---|
| Imports en App.jsx / LanguageContext.jsx / translations.js / i18n.js resuelven | ✅ El build transforma 2001 módulos sin errores |
| 3 traducciones con las mismas claves | ✅ `i18n.js` es=en=pl=**156** · `translations.js` es=en=pl=**84** · `identical=true` |
| Dropdown cierra al click-fuera | ✅ `src/components/LanguageDropdown.jsx:19-27` (listener `mousedown` + `dropdownRef.contains`, con cleanup) |
| `npm run build` | ✅ exit 0, **sin warnings** |

**Observación menor (no es bug):**
- **Archivo:** `src/translations.js` · **Descripción:** es código muerto — ningún módulo lo importa (App y el resto usan `src/i18n.js`). Mantener `pl` en dos ficheros invita a divergencia futura.
  **Fix sugerido:** eliminar `src/translations.js` (o convertirlo en re-export de `i18n.js`) para tener una única fuente de verdad de traducciones.

---

## ✅ BLOQUE 2 — SEO · 9/10

| Elemento | Línea (index.html) | Resultado |
|---|---|---|
| `<title>` | 9 | ✅ "AALTI SYSTEMS - Automatización B2B con IA \| +40% Ventas 24/7" |
| `meta description` | 10 | ✅ Presente (~150 car.) |
| `canonical` | 16 | ✅ `https://aaltisystems.com/` (no-www) |
| `og:url` | 25 | ✅ `https://aaltisystems.com/` (no-www) — **coincide con canonical** |
| `og:title` | 27 | ✅ Idéntico al `<title>` |
| `og:image` | 29 | ✅ `https://aaltisystems.com/og-image.jpg` |
| `twitter:card` | 39 | ✅ `summary_large_image` |
| `hreflang` es/en/pl + x-default | 17-20 | ✅ Los 4 presentes |
| Schema.org JSON-LD | 84, 104, 125 | ✅ 3 bloques: `Organization`, `Service`, `FAQPage` |
| sitemap.xml | — | ✅ Solo raíz, `lastmod 2026-06-05`, sin anclas |
| robots.txt | — | ✅ Sin directivas inválidas, `Sitemap:` → dominio correcto |
| vercel.json redirect www→no-www | 9-21 | ✅ Presente (permanent) |
| vercel.json rewrite SPA | 22-27 | ✅ Presente |

**Problemas (prioridad baja):**

1. **Sitemap incompleto vs hreflang**
   - **Archivo:** `public/sitemap.xml` · **Descripción:** declara solo `/`, pero el hreflang anuncia `/en/` y `/pl/`. Para coherencia de indexación deberían listarse.
   - **Fix exacto:** añadir dos `<url>` con `<loc>https://aaltisystems.com/en/</loc>` y `.../pl/</loc>` (mismo `lastmod`), **una vez** existan versiones realmente indexables (ver Bloque 5/SEO-SSR pendiente). Hoy son client-side, así que es opcional.

2. **`twitter:title` ligeramente distinto del `og:title`**
   - **Archivo:** `index.html:40` · **Descripción:** "…\| +40% Ventas" (sin "24/7") vs `og:title` "…\| +40% Ventas 24/7".
   - **Fix exacto:** unificar el contenido de `twitter:title` con el de `og:title`.

3. **`article:modified_time` desactualizado**
   - **Archivo:** `index.html:48` · **Descripción:** `content="2026-04-29"`.
   - **Fix exacto:** actualizar a `2026-06-05` (o automatizar en build).

---

## ⚠️ BLOQUE 3 — SEGURIDAD · 5/10

### 3.1 — Claves/credenciales hardcodeadas
**Resultado:** ✅ **No se encontraron** API keys, tokens, secrets, ni credenciales en `src/`, `index.html` ni `public/`. (Solo aparece un email de contacto — ver Bloque 4.)

### 3.2 — Validación del formulario + anti-spam
- **Archivo:** `src/components/ImprovedContactForm.jsx:21-29`
- **Frontend:** ✅ Validación completa — nombre, email (regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`), mensaje y checkbox de privacidad obligatorios.
- **Anti-spam:** ❌ **Ausente.** No hay honeypot, captcha ni rate-limit. Además `handleSubmit` (líneas 31-53) **no envía a ningún backend** (es un `setTimeout` simulado), así que no hay validación de servidor.
- **Fix exacto (honeypot, mínimo viable):**
  ```jsx
  // 1) en formData inicial (línea ~15): añadir
  website: '',            // honeypot (debe quedar vacío)
  // 2) en validateForm() (antes del return): bot-trap
  if (formData.website) return { bot: true };   // descarta envíos de bots
  // 3) en el <form>, campo oculto a usuarios:
  <input type="text" name="website" tabIndex={-1} autoComplete="off"
    value={formData.website}
    onChange={(e)=>setFormData({...formData, website:e.target.value})}
    style={{position:'absolute', left:'-9999px'}} aria-hidden="true" />
  ```
  Cuando se conecte a un backend real: validar en servidor + rate-limit por IP (o usar un endpoint serverless con verificación tipo reCAPTCHA/Turnstile).

### 3.3 — Headers de seguridad (vercel.json)
- **Archivo:** `vercel.json` (sección `headers`, líneas 28-58) · **Descripción:** ❌ **Faltan** `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` (y se recomiendan `Strict-Transport-Security`, `Permissions-Policy`).
- **Fix exacto:** añadir como **primer** objeto del array `headers`:
  ```json
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
    ]
  }
  ```

### 3.4 — Vulnerabilidades npm (`npm audit`)
- **Resultado:** ❌ **7 vulnerabilidades (2 moderate, 5 high).**
- **Causa raíz:** dependencias **obsoletas y SIN USAR** en `package.json`:
  - `drei@^2.2.21` (`package.json:15`) → arrastra `lodash.pick`, `troika-three-text` y `three <0.125.0` (DoS, GHSA-fq6p-x6j3-cmmq).
  - `react-three-fiber@^6.0.13` (`package.json:22`) → paquete legacy deprecado.
  - Los paquetes correctos (`@react-three/drei@^9`, `@react-three/fiber@^8`, `three@^0.184`) ya están en deps y son los reales; `drei`/`react-three-fiber` no se importan en ninguna parte (`grep` = 0 usos).
- **Fix exacto (NO usar `npm audit fix --force`, que degradaría a `drei@0.0.45`):**
  ```bash
  npm remove drei react-three-fiber
  npm install            # regenera lockfile
  npm audit              # debería reportar 0 vulnerabilidades
  ```
- **Extra:** `sharp@^0.34.5` (`package.json:23`) está en `dependencies` pero no se importa en `src/` (es herramienta de imágenes en build). Moverlo a `devDependencies` o eliminarlo aligera el install.

---

## ⚠️ BLOQUE 4 — PRIVACIDAD Y LEGAL (GDPR / LOPD) · 7/10

| Requisito | Resultado |
|---|---|
| Página Política de Privacidad | ✅ Existe — `src/pages/PrivacyPolicy.jsx` |
| Aviso Legal | ✅ Existe — `src/pages/LegalNotice.jsx` |
| Banner/consent de cookies | ✅ Existe — `src/components/CookieBanner.jsx` (con Aceptar/Rechazar, persiste en `localStorage`) |
| Checkbox de aceptación de privacidad en el formulario | ✅ Existe y es obligatorio — `src/components/ImprovedContactForm.jsx:155-172` (`acceptPrivacy`) |

**Problemas a corregir para cumplimiento pleno:**

1. **Email personal como contacto oficial** *(prioridad ALTA — imagen + LOPD)*
   - **Archivos/líneas:** `index.html:100` (schema.org), `src/components/ImprovedContactForm.jsx:229`, `src/pages/PrivacyPolicy.jsx:35,111,154`, `src/pages/LegalNotice.jsx:35,53`, `src/pages/NotFound.jsx:203,206`.
   - **Descripción:** `aaltistudio@gmail.com` es un Gmail personal; como responsable del tratamiento y contacto ARCO debe usarse un correo corporativo del dominio.
   - **Fix exacto:** reemplazar todas las apariciones por p. ej. `info@aaltisystems.com` (y `privacidad@aaltisystems.com` para derechos ARCO/GDPR en PrivacyPolicy).

2. **Checkbox de privacidad sin enlace real a la política** *(prioridad MEDIA)*
   - **Archivo/línea:** `src/components/ImprovedContactForm.jsx:166-168`
   - **Descripción:** "política de privacidad" es un `<span>` estilizado, no un enlace; el usuario no puede leerla antes de aceptar (requisito de consentimiento informado).
   - **Fix exacto:** convertir el `<span>` en un enlace/boton que abra `PrivacyPolicy` (o `<a href="/privacidad" target="_blank">`), p. ej.:
     ```jsx
     Acepto la <a href="/privacidad" target="_blank" rel="noopener noreferrer"
       className="text-indigo-400 hover:text-indigo-300 underline">política de privacidad</a> …
     ```

3. **Aviso Legal — identificación del responsable** *(prioridad ALTA — LOPD/LSSI España)*
   - **Archivo:** `src/pages/LegalNotice.jsx`
   - **Descripción:** verificar que incluye **razón social, NIF/CIF y domicilio** del titular (obligatorio por LSSI-CE art. 10). Si faltan, añadirlos.
   - **Fix exacto:** completar el bloque de "Datos identificativos" con denominación social, NIF/CIF y dirección fiscal reales.

4. **Páginas legales y banner solo en español** *(prioridad MEDIA)*
   - **Descripción:** con EN/PL activos, `PrivacyPolicy`, `LegalNotice` y `CookieBanner` siguen hardcodeados en ES.
   - **Fix exacto:** mover sus textos a `i18n.js` (claves `privacy`, `legal`, `cookies`) y consumir `useLanguage()`.

5. **Cookie banner — alcance** *(prioridad BAJA)*
   - **Descripción:** funcional, pero el texto menciona "política de privacidad" sin enlace y `loadAnalyticsCookies()` (`CookieBanner.jsx:30-36`) solo actúa si existe `window.gtag` (hoy no hay analítica real → no hay tracking sin consentimiento, OK).
   - **Fix exacto:** añadir enlace a la política en el banner; cuando se integre analítica, cargar el script **solo** tras "Aceptar".

---

## ✅ BLOQUE 5 — RENDIMIENTO · 8/10

| Check | Resultado |
|---|---|
| `favicon.svg` en /public | ✅ Existe (1.8 KB) — `public/favicon.svg` |
| `apple-touch-icon.png` en /public | ✅ Existe, 180×180 — `public/apple-touch-icon.png` |
| GSAP/Lenis sin bloquear render | ✅ **Resuelto** — los `<script>` GSAP del CDN se eliminaron; Lenis ahora va por npm en el bundle; el único `<script>` JS es `type="module"` (diferido por defecto) — `index.html:167` |
| Imágenes en /public con tamaño razonable | ⚠️ Mayormente sí; `logo.png` algo pesado |
| Recursos externos con preconnect | ✅ Google Fonts con `preconnect` (`index.html:62-63`); ⚠️ pero hay un `@import` de fuente redundante |

**Problemas:**

1. **`@import` de fuente duplicado y render-blocking** *(prioridad MEDIA)*
   - **Archivo/línea:** `src/App.jsx:752` (dentro de un `<style>` inyectado)
   - **Descripción:** las fuentes Google ya se cargan en `index.html:64-65` (con `preconnect`). El `@import` dentro de CSS es una **tercera** carga y los `@import` son render-blocking en cascada.
   - **Fix exacto:** eliminar la línea `@import url('https://fonts.googleapis.com/...')` de `src/App.jsx:752` (las reglas `.font-space-grotesk` / `.font-dm-sans` pueden quedarse).

2. **`logo.png` pesado** *(prioridad BAJA)*
   - **Archivo:** `public/logo.png` (**133 KB**) · se muestra a `h-10`/`h-20`.
   - **Fix exacto:** exportar a WebP/AVIF y/o redimensionar a la resolución real mostrada (≈ 56–224 px de alto); objetivo < 30 KB.

3. **`apple-touch-icon.png` grande para su tamaño** *(prioridad BAJA)*
   - **Archivo:** `public/apple-touch-icon.png` (**37 KB** para 180×180).
   - **Fix exacto:** recomprimir (objetivo < 12 KB) con `sharp`/`pngquant`.

> Nota: no hay recursos externos sin `preconnect` problemáticos (los enlaces a `wa.me`/`instagram` son navegación, no recursos cargados).

---

## 🔧 Lista priorizada de fixes pendientes

### 🔴 Alta
1. **Eliminar deps vulnerables y sin uso** → `npm remove drei react-three-fiber && npm install` (resuelve las 7 vulnerabilidades). — *Bloque 3.4*
2. **Añadir headers de seguridad** en `vercel.json` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS, Permissions-Policy). — *Bloque 3.3*
3. **Reemplazar el email personal** `aaltistudio@gmail.com` por uno corporativo en las 9 ubicaciones. — *Bloque 4.1*
4. **Completar identificación del responsable** (razón social/NIF/domicilio) en el Aviso Legal. — *Bloque 4.3*

### 🟠 Media
5. **Anti-spam (honeypot)** en el formulario de contacto. — *Bloque 3.2*
6. **Enlazar el checkbox de privacidad** a la política real. — *Bloque 4.2*
7. **Eliminar el `@import` de fuente duplicado** en `App.jsx:752`. — *Bloque 5.1*
8. **i18n de páginas legales y cookie banner** (EN/PL). — *Bloque 4.4*

### 🟢 Baja
9. Mover `sharp` a `devDependencies`. — *Bloque 3.4*
10. Optimizar `logo.png` y `apple-touch-icon.png`. — *Bloque 5.2/5.3*
11. Unificar `twitter:title` con `og:title` y actualizar `article:modified_time`. — *Bloque 2.2/2.3*
12. Eliminar `src/translations.js` (código muerto / fuente duplicada). — *Bloque 1*
13. Añadir `/en/` `/pl/` al sitemap cuando sean indexables (SSR/SSG). — *Bloque 2.1*

---

## 📊 Puntuación por bloque

| Bloque | Puntuación |
|---|---|
| 1 · Funcionalidad | **10 / 10** |
| 2 · SEO | **9 / 10** |
| 3 · Seguridad | **5 / 10** |
| 4 · Privacidad / Legal | **7 / 10** |
| 5 · Rendimiento | **8 / 10** |
| **Global (media)** | **7.8 / 10** |

> Con los 4 fixes de prioridad alta aplicados, Seguridad sube a ~9 y Privacidad/Legal a ~9, dejando el proyecto en ~9/10 global.
