// @ts-check

import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// TODO: noImplicitReturns for TypeScript

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: "tsconfig.json",
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      "no-console": "error",
      "newline-before-return": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-tslint-comment": "error",
      "@typescript-eslint/class-literal-property-style": "error",
      "@typescript-eslint/consistent-indexed-object-style": "warn",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-definitions": "warn",
      "@typescript-eslint/member-ordering": [
        "warn",
        { default: ["field", "constructor", "signature", "method"] }
      ],
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-array-delete": "error",
      "@typescript-eslint/method-signature-style": "warn",
      "@typescript-eslint/no-import-type-side-effects": "warn",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/non-nullable-type-assertion-style": "error",
      "@typescript-eslint/prefer-find": "error",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "prefer-promise-reject-errors": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "error",
      "@typescript-eslint/prefer-readonly": "warn",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "warn",
      "no-return-await": "off",
      "@typescript-eslint/return-await": "error",
      "@typescript-eslint/sort-type-constituents": "warn",
      "@typescript-eslint/unified-signatures": "error",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: false,
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "consistent-return": "off"
      // "sort-destructure-keys/sort-destructure-keys": "warn",
      // "typescript-sort-keys/interface": [
      //   "warn",
      //   "asc",
      //   { caseSensitive: true, natural: false, requiredFirst: true }
      // ]
      // "import/order": [
      //   "warn",
      //   {
      //     "groups": ["builtin", "external", "internal"],
      //     "pathGroups": [
      //       {
      //         "pattern": "~/**",
      //         "group": "external",
      //         "position": "before"
      //       },
      //       {
      //         "pattern": "../**",
      //         "group": "internal"
      //       },
      //       {
      //         "pattern": "./**",
      //         "group": "internal"
      //       }
      //     ],
      //     "pathGroupsExcludedImportTypes": [],
      //     "newlines-between": "always"
      //   }
      // ]
    }
  }
];
