// @ts-check
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.stylisticTypeChecked,
  ...tsEslint.configs.strictTypeChecked,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
  {
    rules: {
      'no-console': 'error',
      'consistent-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: false,
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      'newline-before-return': 'warn',
      '@typescript-eslint/member-ordering': [
        'warn',
        { default: ['field', 'constructor', 'signature', 'method'] },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'no-type-imports' },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `vitnode-frontend/navigation` instead.',
        },
        {
          name: 'drizzle-orm/mysql-core',
          message: 'Please import from `drizzle-orm/pg-core` instead.',
        },
        {
          name: 'next/navigation',
          importNames: [
            'redirect',
            'permanentRedirect',
            'useRouter',
            'usePathname',
          ],
          message: 'Please import from `vitnode-frontend/navigation` instead.',
        },
      ],
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      'eslint.config.mjs',
      '.turbo',
      '.next',
      'global.d.ts',
    ],
  },
];
