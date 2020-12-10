module.exports = {
  env: {
    browser: true,
  },
  extends: ['mixup', 'mixup/vue'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/component-definition-name-casing': 'off',
    'comma-dangle': 'error',
    semi: 'error',
    'default-case-last': 'off',
    'no-useless-backreference': 'off',
    'vue/v-on-function-call': 'off',
  },
};
