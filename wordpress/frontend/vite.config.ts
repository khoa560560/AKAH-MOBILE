import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  publicDir: false,
  build: {
    target: "es2020",
    outDir: fileURLToPath(new URL("../akah-mobile-child/assets/app", import.meta.url)),
    emptyOutDir: true,
    cssCodeSplit: false,
    rolldownOptions: {
      input: fileURLToPath(new URL("./main.tsx", import.meta.url)),
      output: {
        format: "iife",
        entryFileNames: "storefront.js",
        assetFileNames: (asset) =>
          asset.names.some((name) => name.endsWith(".css"))
            ? "storefront.css"
            : "fonts/[name]-[hash][extname]",
      },
    },
  },
});
