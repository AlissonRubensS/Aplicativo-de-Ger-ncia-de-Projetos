import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@models": "/models",
      "@services": "/services",
      "@components": "/src/components",
      "@pages" : "/src/components/Pages",
      "@content" : "/src/components/Content",
    },
  },
});
