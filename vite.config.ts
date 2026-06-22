import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 🛠️ 確保 Vercel 打包路徑絕對正確
  base: './',

  plugins: [
    {
      name: 'figma-asset-resolver',
      resolveId(id: any) { 
        if (id.startsWith('figma:asset/')) {
          const filename = id.replace('figma:asset/', '')
          return `./src/assets/${filename}`
        }
        return null // 🎯 最關鍵的一行！如果不是 figma 資源，必須回傳 null 讓 Vite 繼續正常解析別的檔案！
      },
    },
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8080, // 🎯 把這裡的 5173 改成 8080！
    strictPort: true,
    allowedHosts: true,
    hmr: {
      protocol: 'wss',
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})