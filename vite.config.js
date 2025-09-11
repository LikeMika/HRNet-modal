import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config pour builder en librairie
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/Modal.jsx',
      name: 'ReactModalHRNet',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
