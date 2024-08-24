// @ts-check
import eslintVitNode from 'eslint-config-typescript-vitnode/eslint.shared.mjs';

export default [
  ...eslintVitNode,
  {
    ignores: ['tsup.config.ts', 'templates'],
  },
];
