import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import agents from "agents/vite";

export default defineConfig(({ mode }) => {
  const webOnly = mode === "web";

  return {
    plugins: webOnly
      ? [react(), tailwindcss()]
      : [agents(), react(), cloudflare(), tailwindcss()]
  };
});
