import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import tsConfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({}), 
    tsConfigPaths(),
    react()
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  base: "/"
})
