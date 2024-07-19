import vitnodePrettier from "eslint-config-typescript-vitnode/prettierrc.mjs";

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...vitnodePrettier,
};

export default config;
