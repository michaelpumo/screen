/// <reference types="vitest" />

import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    tailwindcss(),
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
        vue: resolve(__dirname, 'src/vue/lib.ts'),
        nuxt: resolve(__dirname, 'src/nuxt/lib.ts'),
      },
      name: 'screen',
      fileName: (format, entryName) => `${entryName}/screen.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@nuxt/kit'],
      output: {
        globals: {
          'vue': 'Vue',
          '@nuxt/kit': 'NuxtKit',
        },
        assetFileNames: 'app.[ext]',
      },
    },
  },
})
