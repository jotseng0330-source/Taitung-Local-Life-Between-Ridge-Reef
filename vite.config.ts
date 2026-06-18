import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 🛠️ 確保 Vercel 打包路徑絕對正確
  base: './',

  plugins: [
    {
      name: 'figma-asset-resolver',
      resolveId(id: any) { // 🛠️ 補上 : any，直接不讓 TS 鬧脾氣
        if (id.startsWith('figma:asset/')) {
          const filename = id.replace('figma:asset/', '')
          // 🎯 不用 path.resolve，改用絕對安全的相對字串拼接
          return `./src/assets/${filename}`
        }
      },
    },
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'wss',
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      // 🎯 這是最關鍵的改法：不用 path.resolve 與 __dirname，直接用相對路徑字串對齊！
      '@': './src',
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})