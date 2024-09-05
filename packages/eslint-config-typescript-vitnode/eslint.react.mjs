// @ts-check
import eslintVitNodeFrontend from './eslint.frontend.mjs';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  ...eslintVitNodeFrontend,
  {
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
    },
  },
  {
    ignores: [
      '.next',
      'global.d.ts',
      'graphql',
      'next.config.ts',
      'src/graphql/types.ts',
    ],
  },
];
