import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User page: served from the root of rohansharmax.github.io, so no base prefix.
export default defineConfig({
  plugins: [react()],
});
