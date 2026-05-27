import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/ventas': {
        target: 'http://10.0.8.79:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ventas/, '/api/v1/ventas')
      },
      '/api/despachos': {
        target: 'http://10.0.8.139:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/despachos/, '/api/v1/despachos')
      }
    }
  }
})
