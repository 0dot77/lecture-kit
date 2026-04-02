import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/lecture-kit/",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        "dmv1-index": "courses/2026-digital-media-visual-1/index.html",
        "dmv1-chop": "courses/2026-digital-media-visual-1/chop-audio-reactive.html",
        "dmv1-chop-slides": "courses/2026-digital-media-visual-1/slides/chop-audio-reactive.html",
        "cc-index": "courses/claude-code-intro/index.html",
        "cc-level2": "courses/claude-code-intro/level-2-basics.html",
      },
    },
  },
});
