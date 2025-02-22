import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
//
export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  build: { commonjsOptions: { include: [/node_modules/] } },
  define: {
    ...(process.env.NODE_ENV === 'development' && { global: {} }),
    'process.env': process.env,
  },
  envPrefix: 'PUBLIC_',
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, './src/constants.ts'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@shared': path.resolve(__dirname, './src/components/shared'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@customTypes': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  server: { port: Number(process.env.PORT ?? 3000) },
});
