import { Config } from 'tailwindcss';

import { createPreset } from 'fumadocs-ui/tailwind-plugin';

const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './views/**/*.{ts,tsx}',
    './mdx-components.{ts,tsx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  presets: [createPreset({ addGlobalColors: true })],
} satisfies Config;

export default config;
