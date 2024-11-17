module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {singleQuote: true, trailingComma: 'all'}],
  },
};
