import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vike from 'vike/plugin';
import path from 'path';

export default defineConfig(() => ({
  base: './',
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react(), vike()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));