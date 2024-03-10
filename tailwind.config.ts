/** @type {import('tailwindcss').Config} */
import { scopedPreflightStyles } from 'tailwindcss-scoped-preflight'

export default {
  content: ['./index.html', './App.vue', './src/**/*.{js,ts,vue}'],
  safelist: [{ pattern: /(sl-bg-token|sl-text-token)-./ }],
  prefix: 'sl-',
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      md: '1.2rem',
      lg: '1.4rem'
    },
    colors: {
      transparent: 'transparent',
      light: {
        muted: 'var(--sl-light-muted)',
        type: 'var(--sl-light-type)',
        primary: 'var(--sl-light-primary)',
        secondary: 'var(--sl-light-secondary)',
        tertiary: 'var(--sl-light-tertiary)',
        quaternary: 'var(--sl-light-quaternary)'
      },
      dark: {
        muted: 'var(--sl-dark-muted)',
        type: 'var(--sl-dark-type)',
        primary: 'var(--sl-dark-primary)',
        secondary: 'var(--sl-dark-secondary)',
        tertiary: 'var(--sl-dark-tertiary)',
        quaternary: 'var(--sl-dark-quaternary)'
      },
      token: {
        array: 'var(--sl-array)',
        bigint: 'var(--sl-bigint)',
        boolean: 'var(--sl-boolean)',
        comment: 'var(--sl-comment)',
        date: 'var(--sl-date)',
        function: 'var(--sl-function)',
        htmlbodyelement: 'var(--sl-htmlbodyelement)',
        location: 'var(--sl-location)',
        map: 'var(--sl-map)',
        null: 'var(--sl-null)',
        number: 'var(--sl-number)',
        object: 'var(--sl-object)',
        regexp: 'var(--sl-regexp)',
        set: 'var(--sl-set)',
        string: 'var(--sl-string)',
        symbol: 'var(--sl-symbol)',
        undefined: 'var(--sl-undefined)',
        weakmap: 'var(--sl-weakmap)',
        weakset: 'var(--sl-weakset)'
      }
    },
    fontFamily: {
      mono: ['Geist Mono', 'Menlo', 'Monaco', 'Courier', 'monospace']
    },
    extend: {}
  },
  plugins: [
    scopedPreflightStyles({
      cssSelector: '.sl-pf',
      mode: 'matched only'
    })
  ]
}
