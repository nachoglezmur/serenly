import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/openrouter': {
        target: 'https://openrouter.ai/api/v1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/openrouter/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🔄 Proxy request:', req.method, req.url);
            console.log('🔑 Headers originales:', req.headers);
            
            // Preservar todos los headers importantes
            if (req.headers.authorization) {
              proxyReq.setHeader('Authorization', req.headers.authorization);
              console.log('✅ Authorization header agregado');
            }
            if (req.headers['content-type']) {
              proxyReq.setHeader('Content-Type', req.headers['content-type']);
            }
            
            // Headers requeridos por OpenRouter
            proxyReq.setHeader('HTTP-Referer', 'http://localhost:5173');
            proxyReq.setHeader('X-Title', 'Espacio Zen - Asistente de Bienestar');
            
            console.log('📤 Headers finales del proxy:', proxyReq.getHeaders());
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('📥 Proxy response:', proxyRes.statusCode, proxyRes.statusMessage);
          });
          
          proxy.on('error', (err, req, res) => {
            console.error('❌ Proxy error:', err);
          });
        }
      }
    }
  }
})