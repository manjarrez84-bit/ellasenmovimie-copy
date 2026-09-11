import { defineConfig } from "vite";
import vikeReact from "vike-react/plugin";
import path from "path";

export default defineConfig(() => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [vikeReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));