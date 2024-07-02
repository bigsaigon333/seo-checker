import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const LOCAL_SERVER_PORT = Number(process.env.LOCAL_SERVER_PORT || 8080);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: `http://localhost:${LOCAL_SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
