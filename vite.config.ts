// vite.config.ts
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  server: { https: true },
  plugins: [mkcert(), glsl()],
});
