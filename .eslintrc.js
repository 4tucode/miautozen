module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    // Consolas: permitir console.error, el resto warn en prod; off en dev
    'no-console': process.env.NODE_ENV === 'production' ? ['warn', { allow: ['error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Reglas mínimas solicitadas
    'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'curly': ['error', 'multi-line'],
    'consistent-return': 'error',
    // Orden de imports
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc', caseInsensitive: true },
      'pathGroups': [
        { pattern: 'firebase/**', group: 'external', position: 'after' },
        { pattern: '@/**', group: 'internal', position: 'after' }
      ],
      'pathGroupsExcludedImportTypes': ['builtin']
    }]
  },
  plugins: [
    'import'
  ]
}
