/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.vue', './src/**/*.{js,ts,vue}'],
  safelist: [{ pattern: /(bg|text|border)-./ }],
  theme: {
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      md: '1.2rem',
      lg: '1.4rem'
    },
    colors: {
      keyOrIdx: 'var(--screen-keyOrIdx)',
      type: 'var(--screen-type)',
      primary: 'var(--screen-primary)',
      secondary: 'var(--screen-secondary)',
      tertiary: 'var(--screen-tertiary)',

      token: {
        array: 'var(--screen-array)',
        bigint: 'var(--screen-bigint)',
        boolean: 'var(--screen-boolean)',
        comment: 'var(--screen-comment)',
        date: 'var(--screen-date)',
        function: 'var(--screen-function)',
        htmlbodyelement: 'var(--screen-htmlbodyelement)',
        location: 'var(--screen-location)',
        map: 'var(--screen-map)',
        null: 'var(--screen-null)',
        number: 'var(--screen-number)',
        object: 'var(--screen-object)',
        regexp: 'var(--screen-regexp)',
        set: 'var(--screen-set)',
        string: 'var(--screen-string)',
        symbol: 'var(--screen-symbol)',
        undefined: 'var(--screen-undefined)',
        weakmap: 'var(--screen-weakmap)',
        weakset: 'var(--screen-weakset)'
      }
    },
    fontFamily: {
      mono: ['Geist Mono', 'Menlo', 'Monaco', 'Courier', 'monospace']
    },
    extend: {}
  },
  plugins: []
}
