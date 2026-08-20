import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 'base' must match the repo name so built asset URLs resolve correctly
// at https://<username>.github.io/<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: '/stacks/',
})
