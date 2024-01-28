
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default {
  plugins: [react()],
   optimizeDeps: {
    include: ['@ckeditor/ckeditor5-build-classic']
  }};