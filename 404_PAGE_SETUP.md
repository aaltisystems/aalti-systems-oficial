# 🔧 Página 404 Personalizada - Guía de Configuración

## ✅ Lo que se ha implementado:

### Componente NotFound.jsx
- **Ubicación:** `/src/pages/NotFound.jsx`
- **Features:**
  - Copy personalizado: "Esta ruta no ha sido automatizada todavía"
  - Diseño moderno con animaciones Framer Motion
  - Bilingüe (Español/English)
  - Sección flotante con el código 404
  - Múltiples CTAs (Volver al Inicio, Auditoría Gratuita)
  - Email de contacto directo
  - Elementos visuales alineados con el brand (gradientes, iconos)

### Integración en App.jsx
```jsx
import NotFound from './pages/NotFound';

// Dentro del componente App:
const [showNotFound, setShowNotFound] = useState(false);

if (showNotFound) {
  return <NotFound onNavigateHome={() => setShowNotFound(false)} />;
}
```

---

## 📍 Cómo acceder a la página 404 actualmente:

### Opción 1: Desde tu código (manual)
```jsx
// Donde quieras mostrar 404:
setShowNotFound(true);
```

### Opción 2: Desde un botón o link
```jsx
<button onClick={() => setShowNotFound(true)}>
  Ir a página 404 (solo para testing)
</button>
```

---

## 🚀 Configuración de React Router (Recomendado para Producción)

Si quieres que la página 404 aparezca automáticamente cuando el usuario navega a una URL que no existe, necesitas agregar React Router.

### Paso 1: Instalar React Router
```bash
npm install react-router-dom
```

### Paso 2: Crear un archivo de routes (src/routes.jsx)
```jsx
import { Routes, Route } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contacto" element={<App initialPage="contact" />} />
      <Route path="/aviso-legal" element={<App initialPage="legal" />} />
      <Route path="/privacidad" element={<App initialPage="privacy" />} />
      
      {/* Ruta para cualquier URL no encontrada */}
      <Route path="*" element={<NotFound onNavigateHome={() => {}} />} />
    </Routes>
  );
}
```

### Paso 3: Actualizar main.jsx
```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes';
import { LanguageProvider } from './LanguageContext';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

requestAnimationFrame(() => {
  root.classList.add('ready');
});
```

### Paso 4: Actualizar App.jsx
Modificar App para no renderizar siempre el sitio completo, sino solo cuando sea necesario:

```jsx
// Cambiar return principal si estás usando rutas
export default function App({ initialPage = 'home' }) {
  // ... resto del código
}
```

---

## 🎨 Personalizaciones Posibles

### Cambiar copy del 404
Editar `/src/pages/NotFound.jsx` líneas 10-27:
```jsx
const content = {
  es: {
    preTitle: "Automatización Pendiente", // Cambiar esto
    title: "Esta ruta no ha sido automatizada todavía", // O esto
    // ...
  }
}
```

### Cambiar colores/estilos
Los colores del 404 están definidos con Tailwind:
- Fondo: `from-slate-950 via-indigo-950 to-slate-950`
- Gradiente del 404: `from-indigo-400 via-purple-400 to-cyan-400`
- Editar las clases de Tailwind en el archivo

### Agregar más CTAs
Duplicar la sección de botones y agregar más opciones

---

## 📊 Diseño Visual Explicado

### Componentes:
1. **Círculo flotante con 404** - Elemento principal, atrae atención
2. **Pre-título con iconos** - "Automatización Pendiente" 
3. **Título principal** - Mensaje consistente con brand
4. **Descripción** - Explica qué pasó
5. **Elementos animados** - Pulsos de color para dinamismo
6. **Botones CTA** - Acciones claras (Volver, Auditoría Gratis)
7. **Email de contacto** - Opción de ayuda directa
8. **Línea decorativa** - Toque de elegancia al pie

### Animaciones:
- Entrada escalonada (staggered)
- Pulsos en tiempo real
- Escala en hover en botones
- Fondos animados al fondo
- Elementos flotantes

---

## ✨ Checklist

- [x] Componente NotFound.jsx creado
- [x] Copy personalizado ("Esta ruta no ha sido automatizada todavía")
- [x] Diseño moderno y consistente
- [x] Animaciones Framer Motion
- [x] Multilingüe (ES/EN)
- [x] Integración en App.jsx
- [ ] React Router configurado (opcional, para produccción)
- [ ] Testear en navegador (F12 para ver el 404)
- [ ] Verificar que los CTAs funcionen
- [ ] Personalizar según preferencias

---

## 🧪 Testing

### Test 1: Ver la página 404 en desarrollo
1. Abre DevTools (F12)
2. Ve a la consola
3. Escribe: `window.location = '/una-ruta-que-no-existe'` (si usas React Router)
4. O llama manualmente a `setShowNotFound(true)` desde un botón

### Test 2: Verificar animaciones
- Las animaciones deben ser suaves
- El 404 debe flotar
- Los botones deben responder al hover

### Test 3: Verificar copy en ambos idiomas
- Cambia el idioma en el selector (Globe icon)
- El 404 debe cambiar a inglés automáticamente

### Test 4: Testing en móvil
- Abre en un móvil o simula con DevTools
- La página debe ser responsive
- Los botones deben ser clickeables

---

## 🔗 URLs de Referencia

- **React Router Docs:** https://reactrouter.com/
- **Framer Motion Docs:** https://www.framer.com/motion/
- **Tailwind CSS:** https://tailwindcss.com/

---

## 📝 Notas

- La página 404 reutiliza los mismos fonts y colores del sitio
- Mantiene la misma experiencia visual que el resto del sitio
- No necesita dependencias adicionales (ya tiene Framer Motion)
- Es totalmente accesible (ARIA labels, contraste, etc.)
- Funciona en modo oscuro/claro si lo implementas

---

**Última actualización:** 2026-04-29
**Versión:** 1.0 (Completa)
**Status:** ✅ Lista para usar
