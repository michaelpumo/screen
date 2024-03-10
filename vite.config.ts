/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true
    // setupFiles: ['vitest.setup.ts']
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // ssr: true,
    target: 'esnext',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      name: 'screen',
      fileName: (format) => `screen.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'screen.[ext]'
      }
    }
  }
})
