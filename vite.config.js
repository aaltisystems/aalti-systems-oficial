import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split heavy vendor libraries into their own chunks so the main
    // bundle stays small and the browser can cache them independently.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three': ['three'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    // three.js / framer-motion are genuinely large; raise the warning
    // threshold so the build log stays clean after intentional splitting.
    chunkSizeWarningLimit: 900,
  },
})
