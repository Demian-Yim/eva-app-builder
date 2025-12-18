import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel 및 일반적인 Node 환경의 process.env를 브라우저에서도 안전하게 사용하도록 설정
    'process.env': {
      API_KEY: process.env.API_KEY
    }
  }
});