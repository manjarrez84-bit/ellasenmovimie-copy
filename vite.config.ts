import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import vike from "vike/plugin"; // Importar el plugin de Vike

export default defineConfig(() => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react(), vike()], // Añadir el plugin de Vike
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));