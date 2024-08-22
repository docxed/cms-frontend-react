import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import TurboConsole from 'unplugin-turbo-console/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composable', 'src/utils'],
      viteOptimizeDeps: true,
      eslintrc: {
        enabled: true,
      },
    }),
    TurboConsole(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
