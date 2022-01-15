import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `
          @import "./src/assets/scss/partials/variables/_colors.scss";
          @import "./src/assets/scss/partials/utils/_breakpoints.scss";
          @import "./src/assets/scss/partials/utils/_typography.scss";
          `,
      },
    },
  },
});
