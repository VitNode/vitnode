import { Config } from 'tailwindcss';
import vitnodeConfig from 'vitnode-frontend/tailwind.config';

const config = {
  presets: [vitnodeConfig],
  content: [
    '../../node_modules/vitnode-frontend/src/components/**/*.tsx',
    '../../node_modules/vitnode-frontend/src/views/**/*.tsx',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './plugins/templates/**/*.{ts,tsx}',
  ],
} satisfies Config;

export default config;
