import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const basePath = mode === 'production' ? '/lv470-aliens-fansite/' : '/';
  return {
    plugins: [vue()],
    base: mode === 'production' ? '/lv470-aliens-fansite/' : '/',
    build: {
      outDir: './docs'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
        '~@': path.resolve(__dirname, '/src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // example : additionalData: `@import "./src/design/styles/variables";`
          // dont need include file extend .scss
          additionalData: `
          @import "./src/assets/scss/partials/variables/_layout.scss";
          @import "./src/assets/scss/partials/variables/_colors.scss";
          @import "./src/assets/scss/partials/utils/_breakpoints.scss";
          @import "./src/assets/scss/partials/utils/_typography.scss";
          @import "./src/assets/scss/partials/_fonts.scss";
          `
        }
      }
    }
  };
});
