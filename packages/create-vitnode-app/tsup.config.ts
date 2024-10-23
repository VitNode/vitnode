import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  outDir: 'dist',
  clean: true,
  minify: true,
});
