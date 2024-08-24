// @ts-check
import eslintVitNodeShared from './eslint.shared.mjs';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  ...eslintVitNodeShared,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },
  {
    ignores: ['tailwind.config.ts', 'postcss.config.mjs'],
  },
];
