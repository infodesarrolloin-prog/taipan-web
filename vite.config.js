import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(() => ({
  server: {
    port: 3000,
    proxy: {
<<<<<<< Updated upstream
      // Proxy para API REST
      '/api': {
        target: 'http://152.53.209.47:8082',
        changeOrigin: true,
        secure: false,
      },
      
      // Proxy correcto para WebSocket (Socket)
      '/api/socket': {
        target: 'ws://152.53.209.47:8082',
        ws: true,                    // ← Muy importante
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/socket/, '/api/socket')
      }
    }
=======
      '/api/socket': 'ws://backend:8082',
      '/api': 'http://backend:8082',
    },
>>>>>>> Stashed changes
  },

  build: {
    outDir: 'build',                 // Mantienes tu configuración
    emptyOutDir: true,
    chunkSizeWarningLimit: 1100,
  },

  plugins: [
    svgr(),
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        globPatterns: ['**/*.{js,css,html,woff,woff2,mp3}'],
      },
      manifest: {
        short_name: '${title}',
        name: '${description}',
        theme_color: '${colorPrimary}',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
    viteStaticCopy({
      targets: [
        { src: 'node_modules/@mapbox/mapbox-gl-rtl-text/dist/mapbox-gl-rtl-text.js', dest: '' },
      ],
    }),
  ],
}));