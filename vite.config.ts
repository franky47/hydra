import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'public',
    lib: {
      entry: 'src/vue/main.ts',
      formats: ['es'],
      fileName: 'vue'
    }
  },
  define: {
    'process.env.NODE_ENV': "'production'"
  }
})
