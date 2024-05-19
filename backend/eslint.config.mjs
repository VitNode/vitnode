// @ts-check

import esLintPluginVitNode from "@vitnode/eslint-config-vitnode";

export default [
  ...esLintPluginVitNode,
  {
    ignores: ["dist", "node_modules", "uploads", ".turbo", "eslint.config.mjs"]
  }
];
