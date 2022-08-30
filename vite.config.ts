/// <reference types="vitest" />

import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true
    // setupFiles: ['vitest.setup.ts']
  },
  plugins: [
    vue({
      reactivityTransform: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // ssr: true,
    target: 'esnext',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: 'lib',
      fileName: (format) => `lib.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
