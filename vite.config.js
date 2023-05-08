import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      // clientPort: 443
    },
    proxy: {
      "/api": "http://localhost:6210"
    }
  },
  resolve: {
    alias: {
      axiosPath: path.resolve(__dirname, "src/axios"),
      piniaPath: path.resolve(__dirname, "src/pinia"),
      viewPath: path.resolve(__dirname, "src/views")
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
});
