import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  react: true,
  rules: {
    'antfu/top-level-function': 'off',
    'curly': 'off',
    'node/prefer-global/process': 'off',
    // 'vue/define-macros-order': 'off',
    // 'vue/no-v-html': 'off',
    // 'vue/multi-word-component-names': 'off',
    // 'vue/padding-line-between-tags': ['error', [
    //   { blankLine: 'always', prev: '*', next: '*' },
    // ]],
    // 'vue/custom-event-name-casing': ['error', 'kebab-case', {
    //   ignores: [],
    // }],
  },
})
