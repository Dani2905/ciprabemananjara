import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const sourceRoot = fileURLToPath(new URL('./src/', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': sourceRoot,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: ['.e2b.app', 'localhost'],
    proxy: {
      '/api': { target: 'http://127.0.0.1:3001', changeOrigin: false },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['.e2b.app', 'localhost'],
  },
  build: {
    // Keep the production frontend alongside the Passenger app so Express can serve
    // the website and /api from the same origin without a separate rewrite proxy.
    outDir: 'server/public',
    emptyOutDir: true,
  },
});
