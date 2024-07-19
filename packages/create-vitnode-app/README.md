<p align="center">
  <br>
  <a href="https://vitnode.com/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/aXenDeveloper/vitnode/canary/apps/docs/assets/logo/vitnode_logo_dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/aXenDeveloper/vitnode/canary/apps/docs/assets/logo/vitnode_logo_light.svg">
      <img alt="VitNode Logo" src="https://raw.githubusercontent.com/aXenDeveloper/vitnode/canary/apps/docs/assets/logo/vitnode_logo_light.svg" width="400">
    </picture>
  </a>
  <br>
  <br>
</p>

# (VitNode) Create App

This package is a CLI tool to create a new VitNode app quickly.

Script based on [Create Next App](https://nextjs.org/).

## Usage

```bash
npx create-vitnode-app@latest
```

or

```bash
pnpm create vitnode-app@latest
```

## Options

| Option                     | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| `--package-manager`, `-pm` | Specify the package manager to use. Support `npm`, `pnpm`. |
| `--eslint`                 | Initialize with eslint config.                             |
| `--docker`                 | Initialize with Dockerfile & Docker Compose.               |
| `--no-eslint`              | Skip initializing with eslint config.                      |
| `--skip-install`           | Skip installing packages after initializing the project.   |
