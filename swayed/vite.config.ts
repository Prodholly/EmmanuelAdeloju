import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Built output is copied into the Jekyll site at /tools/swayed/
// and served at https://prodholly.github.io/EmmanuelAdeloju/tools/swayed/
export default defineConfig({
  base: "/EmmanuelAdeloju/tools/swayed/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(__dirname, "../tools/swayed"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        study: resolve(__dirname, "index.html"), // project / results page
        play: resolve(__dirname, "play/index.html"), // the interactive tool
      },
      // ".min.js" names make the site's jekyll-terser step skip these already-minified files
      output: {
        entryFileNames: "assets/[name]-[hash].min.js",
        chunkFileNames: "assets/[name]-[hash].min.js",
      },
    },
  },
  test: { environment: "node" },
});
