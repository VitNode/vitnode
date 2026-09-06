import eslintVitNode from "@vitnode/config/eslint";
import eslintVitNodeReact from "@vitnode/config/eslint.react";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  ...eslintVitNode,
  ...eslintVitNodeReact,
  {
    /**
     * Fixtures a test reads as text.
     *
     * They are kept outside `src` and outside `tsconfig.json`'s `include` on
     * purpose, and the typed rules need a file to be in the project - so ESLint
     * has to skip them.
     */
    ignores: ["test-fixtures/**"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
];
