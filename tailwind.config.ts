/** @type {import('tailwindcss').Config} */
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from 'tailwindcss-scoped-preflight'

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
      lg: '1.4rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      muted: 'var(--sl-muted)',
      type: 'var(--sl-type)',
      primary: 'var(--sl-primary)',
      secondary: 'var(--sl-secondary)',
      tertiary: 'var(--sl-tertiary)',
      quaternary: 'var(--sl-quaternary)',
      token: {
        array: 'var(--sl-array)',
        arraybuffer: 'var(--sl-arraybuffer)',
        asyncfunction: 'var(--sl-asyncfunction)',
        asyncgeneratorfunction: 'var(--sl-asyncgeneratorfunction)',
        bigint: 'var(--sl-bigint)',
        bigint64array: 'var(--sl-bigint64array)',
        biguint64array: 'var(--sl-biguint64array)',
        boolean: 'var(--sl-boolean)',
        comment: 'var(--sl-comment)',
        date: 'var(--sl-date)',
        error: 'var(--sl-error)',
        file: 'var(--sl-file)',
        float32array: 'var(--sl-purple)',
        float64array: 'var(--sl-purple)',
        function: 'var(--sl-function)',
        generatorfunction: 'var(--sl-generatorfunction)',
        htmlbodyelement: 'var(--sl-htmlbodyelement)',
        int8array: 'var(--sl-int8array)',
        int16array: 'var(--sl-int16array)',
        int32array: 'var(--sl-int32array)',
        location: 'var(--sl-location)',
        map: 'var(--sl-map)',
        math: 'var(--sl-math)',
        null: 'var(--sl-null)',
        number: 'var(--sl-number)',
        object: 'var(--sl-object)',
        regexp: 'var(--sl-regexp)',
        set: 'var(--sl-set)',
        string: 'var(--sl-string)',
        symbol: 'var(--sl-symbol)',
        uint8array: 'var(--sl-uint8array)',
        uint16array: 'var(--sl-uint16array)',
        uint32array: 'var(--sl-uint32array)',
        uint8clampedarray: 'var(--sl-uint8clampedarray)',
        undefined: 'var(--sl-undefined)',
        url: 'var(--sl-url)',
        urlsearchparams: 'var(--sl-urlsearchparams)',
        weakmap: 'var(--sl-weakmap)',
        weakref: 'var(--sl-weakref)',
        weakset: 'var(--sl-weakset)',
      },
    },
    fontFamily: {
      mono: ['Geist Mono', 'Menlo', 'Monaco', 'Courier', 'monospace'],
    },
    extend: {},
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.sl-pf'),
    }),
  ],
}
