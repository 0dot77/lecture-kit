import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/lecture-kit/",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        dashboard: "dashboard.html",
        "dmv1-index": "courses/2026-digital-media-visual-1/index.html",
        "dmv1-chop": "courses/2026-digital-media-visual-1/chop-audio-reactive.html",
        "dmv1-chop-slides": "courses/2026-digital-media-visual-1/slides/chop-audio-reactive.html",
      },
    },
  },
});
