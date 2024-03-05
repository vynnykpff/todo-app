import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import tsPath from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsPath()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
