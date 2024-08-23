// @ts-check
import eslintVitNodeShared from './eslint.shared.mjs';

export default [
  ...eslintVitNodeShared,
  {
    ignores: ['tailwind.config.ts', 'postcss.config.mjs'],
  },
];
