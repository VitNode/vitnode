import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface PackageJSON {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  name: string;
  overrides?: Record<string, string>;
  packageManager?: string;
  private: boolean;
  scripts?: Record<string, string>;
  version: string;
  workspaces?: string[];
}

export const createPackagesJSON = ({
  appName,
  root,
  packageManager,
  docker,
  eslint,
}: {
  appName: string;
  docker: boolean;
  eslint: boolean;
  packageManager: string;
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
      'config:init': 'turbo config:init',
      dev: 'turbo dev',
      build: 'turbo build',
      start: 'turbo start',
      codegen: 'turbo codegen',
      db: 'turbo db',
      ...(eslint ? { lint: 'turbo lint', 'lint:fix': 'turbo lint:fix' } : {}),
      ...(docker
        ? {
            'docker:dev': `docker compose -f ./docker-compose-dev.yml -p vitnode-dev-${appName} up -d`,
          }
        : {}),
    },
    overrides: packageManager.startsWith('npm')
      ? {
          react: '^19.0.0-rc.0',
          'react-dom': '^19.0.0-rc.0',
        }
      : {},
    devDependencies: {
      ...(eslint
        ? {
            'eslint-config-typescript-vitnode': `^${pkg.version}`,
            prettier: '^3.3.3',
            'prettier-plugin-tailwindcss': '^0.6.6',
          }
        : {}),
      turbo: '^2.1.2',
    },
    packageManager,
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
      'config:init': 'vitnode-frontend init',
      dev: 'vitnode-frontend init && next dev --turbo',
      build: 'next build',
      start: 'next start',
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
    },
    dependencies: {
      '@hookform/resolvers': '^3.9.0',
      geist: '^1.3.1',
      'lucide-react': '^0.441.0',
      next: '^15.0.0-canary.155',
      'next-intl': '^3.19.1',
      react: '^19.0.0-rc-d6cb4e77-20240911',
      'react-dom': '^19.0.0-rc-d6cb4e77-20240911',
      'react-hook-form': '^7.53.0',
      'vitnode-frontend': `^${pkg.version}`,
    },
    devDependencies: {
      '@types/node': '^22.5.5',
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      autoprefixer: '^10.4.20',
      ...(eslint ? { eslint: '^9.10.0' } : {}),
      'eslint-config-typescript-vitnode': `^${pkg.version}`,
      'graphql-tag': '^2.12.6',
      postcss: '^8.4.45',
      tailwindcss: '^3.4.11',
      typescript: '^5.6.2',
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
      'drizzle-kit': 'drizzle-kit',
      'config:init': 'vitnode-backend init',
      codegen: 'graphql-codegen',
      dev: 'vitnode-backend init && cross-env NODE_ENV=development nest start -w',
      build: 'nest build',
      start: 'node dist/main',
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
      db: 'vitnode-backend db',
    },
    dependencies: {
      '@nestjs/common': '^10.4.1',
      '@nestjs/core': '^10.4.1',
      '@nestjs/graphql': '^12.2.0',
      '@nestjs/schedule': '^4.1.0',
      '@react-email/components': '^0.0.25',
      'class-transformer': '^0.5.1',
      'class-validator': '^0.14.1',
      react: '^19.0.0-rc.0',
      'react-dom': '^19.0.0-rc.0',
      'reflect-metadata': '^0.2.2',
      'vitnode-backend': `^${pkg.version}`,
    },
    devDependencies: {
      '@graphql-codegen/cli': '^5.0.2',
      '@nestjs/cli': '^10.4.5',
      '@nestjs/platform-express': '^10.4.1',
      '@nestjs/schematics': '^10.1.4',
      '@types/express': '^4.17.21',
      '@types/node': '^22.5.5',
      '@types/pg': '^8.11.10',
      '@types/react': '^18.3.5',
      'cross-env': '^7.0.3',
      'drizzle-kit': '^0.24.2',
      'drizzle-orm': '^0.33.0',
      ...(eslint ? { eslint: '^9.10.0' } : {}),
      'eslint-config-typescript-vitnode': `^${pkg.version}`,
      pg: '^8.12.0',
      'source-map-support': '^0.5.21',
      'ts-loader': '^9.5.1',
      'ts-node': '^10.9.2',
      'tsconfig-paths': '^4.2.0',
      typescript: '^5.6.2',
    },
  };

  writeFileSync(
    join(root, 'apps', 'backend', 'package.json'),
    JSON.stringify(backendPackagesJSON, null, 2),
  );
};
