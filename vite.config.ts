/// <reference types="vitest" />

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: {
        react: resolve(__dirname, 'src/react/lib.ts'),
        vue: resolve(__dirname, 'src/vue/lib.ts'),
      },
      name: 'screen',
      fileName: (format, entryName) => `${entryName}/screen.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vue'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'vue': 'Vue',
        },
        assetFileNames: 'app.[ext]',
      },
    },
  },
})
