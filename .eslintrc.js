module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Reglas básicas para la demo
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single'],
    'indent': ['warn', 2],
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'warn'
  },
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'playwright-report/',
    'test-results/'
  ]
};
