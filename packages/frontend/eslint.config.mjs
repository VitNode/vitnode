// @ts-check
import eslintVitNode from 'eslint-config-typescript-vitnode/eslint.react.mjs';

export default [
  ...eslintVitNode,
  {
    ignores: ['src/graphql', 'next.config.d.ts'],
  },
];
