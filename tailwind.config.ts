/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.vue', './src/**/*.{js,ts,vue}'],
  safelist: [{ pattern: /(bg|text|border)-./ }],
  theme: {
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem'
    },
    colors: {
      black: '#000',
      keyOrIdx: 'var(--screen-keyOrIdx)',
      type: 'var(--screen-type)',
      primary: 'var(--screen-primary)',
      secondary: 'var(--screen-secondary)',
      brand: {
        comment: 'var(--screen-comment)',
        undefined: 'var(--screen-undefined)',
        number: 'var(--screen-number)',
        string: 'var(--screen-string)',
        object: 'var(--screen-object)',
        array: 'var(--screen-array)',
        null: 'var(--screen-null)',
        boolean: 'var(--screen-boolean)',
        regexp: 'var(--screen-regexp)',
        htmlbodyelement: 'var(--screen-htmlbodyelement)',
        date: 'var(--screen-date)',
        location: 'var(--screen-location)',
        bigint: 'var(--screen-bigint)',
        symbol: 'var(--screen-symbol)',
        function: 'var(--screen-function)',
        weakmap: 'var(--screen-weakmap)',
        map: 'var(--screen-map)',
        set: 'var(--screen-set)'
      }
    },
    fontFamily: {
      mono: ['Geist Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace']
    },
    extend: {}
  },
  plugins: []
}
