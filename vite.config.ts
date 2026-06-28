import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // 🛠️ 只在「npm run build」（給 Vercel 用的正式建置）時用相對路徑，
  // 開發伺服器（npm run dev，例如在 Codespaces 裡跑）維持預設的絕對路徑 '/'。
  // 用相對路徑跑開發伺服器，透過 Codespaces 轉送網址存取時很容易被誤判成 404。
  base: command === 'build' ? './' : '/',

  plugins: [
    {
      name: 'figma-asset-resolver',
      resolveId(id: any) { 
        if (id.startsWith('figma:asset/')) {
          const filename = id.replace('figma:asset/', '')
          return `./src/assets/${filename}`
        }
        return null
      },
    },
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8000, 
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
}))