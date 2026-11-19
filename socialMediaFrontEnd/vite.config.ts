import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    'babel-plugin-react-compiler',
    react(),   babel({
      presets: [reactCompilerPreset()],
    }),
    eslint({
      failOnError: false,
      failOnWarning: false,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
