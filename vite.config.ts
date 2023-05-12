import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import purgecss from '@fullhuman/postcss-purgecss'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        purgecss({
          content: [`./*.html`, `./src/**/*.vue`],
          defaultExtractor(content) {
            const contentWithoutStyleBlocks = content.replace(
              /<style[^]+?<\/style>/gi,
              ''
            )
            return (
              contentWithoutStyleBlocks.match(
                /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
              ) || []
            )
          },
          safelist: [
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!(|.*?:)cursor-move).+-move$/,
            /^router-link(|-exact)-active$/,
            /data-v-.*/,
          ],
        }),
      ],
    },
  },
})
