# (VitNode) ESLint Config

Package providing ESLint & TypeScript _(TSConfig)_ configuration from [VitNode](https://vitnode.com/).

> [!TIP]
> This package is not for only VitNode, you can use it in any project where is TypeScript.

> [!CAUTION]
> Only ESLint 9+ is supported.

<p align="center">
  <br>
  <a href="https://vitnode.com/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/VitNode/vitnode/canary/assets/logo/vitnode_logo_dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/VitNode/vitnode/canary/assets/logo/vitnode_logo_light.svg">
      <img alt="VitNode Logo" src="https://raw.githubusercontent.com/VitNode/vitnode/canary/assets/logo/vitnode_logo_light.svg" width="400">
    </picture>
  </a>
  <br>
  <br>
</p>

## Installation

```bash
npm install --save-dev eslint-config-typescript-vitnode
```

or

```bash
pnpm add --save-dev eslint-config-typescript-vitnode
```

## ESLint

### Shared

`eslint.shared.mjs` can be used for any TypeScript project.

File: `eslint.config.mjs`

```json
import eslintVitNode from 'eslint-config-typescript-vitnode/eslint.shared.mjs';

export default [...eslintVitNode];
```

### React / NextJS

`eslint.react.mjs` can be used for any React / NextJS project.

File: `eslint.config.mjs`

```json
import eslintVitNode from 'eslint-config-typescript-vitnode/eslint.react.mjs';

export default [...eslintVitNode];
```

### Frontend

`eslint.frontend.mjs` can be used for any frontend project.

File: `eslint.config.mjs`

```json
import eslintVitNode from 'eslint-config-typescript-vitnode/eslint.frontend.mjs';

export default [...eslintVitNode];
```

## TSConfig

### Shared

`tsconfig.shared.json` can be used for any TypeScript project.

File: `tsconfig.json`

```json
{
  "extends": "eslint-config-typescript-vitnode/tsconfig.shared.json"
}
```

### NestJS

`tsconfig.nest.json` can be used for any NestJS project.

File: `tsconfig.json`

```json
{
  "extends": "eslint-config-typescript-vitnode/tsconfig.nest.json"
}
```

### NextJS

`tsconfig.next.json` can be used for any NextJS project.

File: `tsconfig.json`

```json
{
  "extends": "eslint-config-typescript-vitnode/tsconfig.next.json"
}
```

## Prettier

`prettierrc.mjs` can be used for any project.

File: `.prettierrc.mjs`

```js
import vitnodePrettier from 'eslint-config-typescript-vitnode/prettierrc.mjs';

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...vitnodePrettier,
};

export default config;
```
