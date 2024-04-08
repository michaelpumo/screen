/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true
  },
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
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
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: {
        react: resolve(__dirname, 'src/react/lib.ts'),
        vue: resolve(__dirname, 'src/vue/lib.ts')
      },
      name: 'screen',
      fileName: (format, entryName) => `${entryName}/screen.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'vue'],
      output: {
        globals: {
          react: 'React',
          vue: 'Vue'
        },
        assetFileNames: 'screen.[ext]'
      }
    }
  }
})
