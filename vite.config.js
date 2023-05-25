import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {  // testing with vitest
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests',
  },
})
