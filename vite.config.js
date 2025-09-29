import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api/steamgriddb': {
          target: 'https://www.steamgriddb.com/api/v2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/steamgriddb/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Add the API key to all proxied requests
              const apiKey = env.VITE_STEAMGRIDDB_API_KEY;
              if (apiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
                console.log('Proxy: Adding API key to request:', apiKey.substring(0, 8) + '...');
              } else {
                console.log('Proxy: No API key found in environment variables');
              }
            });
          }
        }
      }
    }
  }
})
