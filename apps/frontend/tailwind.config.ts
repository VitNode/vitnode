import { Config } from 'tailwindcss';
import vitnodeConfig from 'vitnode-frontend/tailwind.config';

const config = {
  presets: [vitnodeConfig],
  content: [
    './node_modules/vitnode-frontend/src/components/**/*.{ts,tsx}',
    './node_modules/vitnode-frontend/src/views/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/plugins/**/*.{ts,tsx}',
  ],
} satisfies Config;

export default config;
