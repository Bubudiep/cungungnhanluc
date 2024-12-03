import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6500, // Đặt port thành 6500
  },
  css: {
    postcss: "./postcss.config.js", // Đảm bảo đường dẫn đúng
  },
});
