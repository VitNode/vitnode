import { Config } from 'tailwindcss';
import vitnodeConfig from 'vitnode-frontend/tailwind.config';

const config = {
  presets: [vitnodeConfig],
  content: [
    './node_modules/vitnode-frontend/src/components/**/*.tsx',
    './node_modules/vitnode-frontend/src/views/**/*.tsx',
    './src/components/**/*.tsx',
    './src/app/**/*.tsx',
    './src/plugins/**/*.tsx',
  ],
} satisfies Config;

export default config;
