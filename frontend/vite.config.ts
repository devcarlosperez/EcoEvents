import { defineConfig } from 'vite'
<<<<<<< HEAD
import react from '@vitejs/plugin-react'
=======
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
>>>>>>> dafbb8d5e17c1c9814ea9303d7cce4a0be802d24

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
