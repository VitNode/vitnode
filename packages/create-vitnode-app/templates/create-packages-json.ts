import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface PackageJSON {
  name: string;
  private: boolean;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  workspaces?: string[];
}

export const createPackagesJSON = ({
  appName,
  root,
}: {
  appName: string;
  root: string;
}) => {
  const pkg: PackageJSON = JSON.parse(
    readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'),
  );

  const basePackageJSON: PackageJSON = {
    name: appName,
    version: '1.0.0',
    private: true,
    scripts: {
      'config:init': 'vitnode-frontend init',
      dev: 'vitnode-frontend init && turbo dev',
      build: 'turbo build',
      lint: 'turbo lint',
      'lint:fix': 'turbo lint:fix',
    },
    dependencies: {
      'drizzle-kit': '^0.22.8',
      'drizzle-orm': '^0.31.4',
    },
    devDependencies: {
      'eslint-config-typescript-vitnode': `^${pkg.version}`,
      prettier: '^3.3.3',
      'prettier-plugin-tailwindcss': '^0.6.5',
      turbo: '^2.0.7',
      typescript: '^5.4.5',
    },
    workspaces: ['apps/*'],
  };

  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify(basePackageJSON, null, 2),
  );

  const frontendPackagesJSON: PackageJSON = {
    name: 'frontend',
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev --turbo',
      build: 'next build',
      start: 'next start',
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
    },
    dependencies: {
      next: '15.0.0-rc.0',
      react: '19.0.0-rc.0',
      'react-dom': '19.0.0-rc.0',
      'next-intl': '^3.17.1',
      'vitnode-frontend': `^${pkg.version}`,
    },
    devDependencies: {
      '@types/node': '^20.14.11',
      '@types/react': '^18.3.3',
      '@types/react-dom': '^18.3.0',
      eslint: '^8.57.0',
      'eslint-config-typescript-vitnode': `^${pkg.version}`,
      typescript: '^5.5.3',
    },
  };

  writeFileSync(
    join(root, 'apps', 'frontend', 'package.json'),
    JSON.stringify(frontendPackagesJSON, null, 2),
  );

  const backendPackagesJSON: PackageJSON = {
    name: 'backend',
    version: '1.0.0',
    private: true,
    scripts: {
      'config:init': 'vitnode-backend init',
      build: 'nest build',
      dev: 'vitnode-backend init && cross-env NODE_ENV=development nest start -w',
      start: 'node dist/main',
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
    },
    dependencies: {
      '@nestjs/common': '^10.3.10',
      '@nestjs/core': '^10.3.10',
      '@nestjs/graphql': '^12.2.0',
      '@react-email/components': '^0.0.21',
      'reflect-metadata': '^0.2.2',
      'vitnode-backend': `^${pkg.version}`,
    },
    devDependencies: {
      '@nestjs/cli': '^10.4.2',
      '@nestjs/platform-express': '^10.3.10',
      '@nestjs/schematics': '^10.1.2',
      '@types/express': '^4.17.21',
      '@types/node': '^20.14.11',
      '@types/pg': '^8.11.6',
      '@types/react': '^18.3.3',
      'cross-env': '^7.0.3',
      'drizzle-kit': '^0.22.8',
      'drizzle-orm': '^0.31.4',
      eslint: '^8.57.0',
      'eslint-config-typescript-vitnode': `^${pkg.version}`,
      pg: '^8.12.0',
      'source-map-support': '^0.5.21',
      'ts-loader': '^9.5.1',
      'ts-node': '^10.9.2',
      'tsconfig-paths': '^4.2.0',
      typescript: '^5.5.3',
    },
  };

  writeFileSync(
    join(root, 'apps', 'backend', 'package.json'),
    JSON.stringify(backendPackagesJSON, null, 2),
  );
};
