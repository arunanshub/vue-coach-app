import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import cssnano from 'cssnano'
import { URL, fileURLToPath } from 'node:url'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  build: {
    target: browserslistToEsbuild(),
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        autoprefixer(),
        cssnano({ preset: 'default' }),
      ],
    },
  },
})
