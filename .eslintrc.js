module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-restricted-syntax': 'off',
    'no-console': 'warn',
    'no-plusplus': 'off',
    'no-unused-vars': 'warn',
    'no-continue': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'prefer-destructuring': 'warn',
  },
};
