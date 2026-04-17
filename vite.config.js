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
        "dmv1-audio-advanced": "courses/2026-digital-media-visual-1/audio-reactive-advanced.html",
        "dmv1-audio-advanced-slides": "courses/2026-digital-media-visual-1/slides/audio-reactive-advanced.html",
        "cc-index": "courses/claude-code-intro/index.html",
        "cc-level2": "courses/claude-code-intro/level-2-basics.html",
        "vtc-index": "courses/vibe-to-code/index.html",
        "vtc-week01": "courses/vibe-to-code/week-01.html",
        "vtc-week02": "courses/vibe-to-code/week-02.html",
        "vtc-week03": "courses/vibe-to-code/week-03.html",
        "comfyui-index": "courses/comfyui-basics/index.html",
        "comfyui-week03": "courses/comfyui-basics/week-03.html",
      },
    },
  },
});
