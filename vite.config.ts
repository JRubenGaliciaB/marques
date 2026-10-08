import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        principal: 'index.html',
        mapa: 'mapa-crecimiento/index.html',
      },

      output: {
        manualChunks: {
          charts: ['recharts'],
          map: ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
});