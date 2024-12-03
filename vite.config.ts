import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/partydice-react/", // **Ensure this is set for GitHub Pages deployment**
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    // Removed lovable-tagger plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
