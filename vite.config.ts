import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import agents from "agents/vite";
import { contactApiDevPlugin } from "./src/lib/contact-dev-plugin";

export default defineConfig(({ mode }) => {
  const webOnly = mode === "web";

  return {
    resolve: {
      dedupe: ["react", "react-dom"]
    },
    plugins: webOnly
      ? [react(), tailwindcss(), contactApiDevPlugin()]
      : [agents(), react(), cloudflare(), tailwindcss()]
  };
});
