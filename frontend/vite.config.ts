import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from 'vite-plugin-svgr'

const PROXY_API = process.env.PROXY_API;

// Removes /api/v1 from proxied paths
const PROXY_REMOVE_BASE_PATH = !!process.env.PROXY_REMOVE_BASE_PATH;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
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
            rewrite(path) {
              if (PROXY_REMOVE_BASE_PATH) {
                return path.replace("/api/v1", "");
              } else return path;
            },
          },
        }
      : {},
  },
});
