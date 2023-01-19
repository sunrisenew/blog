module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'no-var': 'error',
    'no-unused-vars': 'off',
    'no-irregular-whitespace': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
