import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
const PROXY_API = process.env.PROXY_API;
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: PROXY_API
      ? {
          "/api": {
            target: PROXY_API,
          },
        }
      : {},
  },
});
