/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.vue', './src/**/*.{js,ts,vue}'],
  safelist: [{ pattern: /(bg|text|border)-./ }],
  theme: {
    colors: {
      black: '#000',
      keyOrIdx: 'var(--vuelog-keyOrIdx)',
      type: 'var(--vuelog-type)',
      primary: 'var(--vuelog-primary)',
      secondary: 'var(--vuelog-secondary)',
      brand: {
        comment: 'var(--vuelog-comment)',
        undefined: 'var(--vuelog-undefined)',
        number: 'var(--vuelog-number)',
        string: 'var(--vuelog-string)',
        object: 'var(--vuelog-object)',
        array: 'var(--vuelog-array)',
        null: 'var(--vuelog-null)',
        boolean: 'var(--vuelog-boolean)',
        regexp: 'var(--vuelog-regexp)',
        htmlbodyelement: 'var(--vuelog-htmlbodyelement)',
        date: 'var(--vuelog-date)',
        location: 'var(--vuelog-location)',
        bigint: 'var(--vuelog-bigint)',
        symbol: 'var(--vuelog-symbol)',
        function: 'var(--vuelog-function)'
      }
    },
    fontFamily: {
      mono: ['Geist Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace']
    },
    extend: {}
  },
  plugins: []
}
