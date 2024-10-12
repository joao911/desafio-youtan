import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { InlineConfig } from "vitest";
import { UserConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
  },
} as UserConfig & InlineConfig);
