// @ts-check
import eslintVitNodeFrontend from './eslint.frontend.mjs';

export default [
  ...eslintVitNodeFrontend,
  {
    ignores: [
      '.next',
      'global.d.ts',
      '/graphql',
      '/src/graphql',
      'plugins/**/*/graphql',
      'next.config.ts',
    ],
  },
];
