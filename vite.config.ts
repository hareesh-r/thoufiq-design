import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Must match deployment in `src/config/googleAppsScript.ts` (`GAS_WEB_APP_EXEC`). */
const GAS_EXEC_PATH =
  "/macros/s/AKfycbw3fNSkCnNFI50WJF8lxuQ27uQhPcFEuCzMITtzNOiP5dfs51fmNNdU2WBykia4P-Rm/exec";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev: browser POSTs same-origin → Vite forwards to script.google.com (no localhost CORS)
      "/google-apps-webhook": {
        target: "https://script.google.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.split("?")[0] === "/google-apps-webhook" ? GAS_EXEC_PATH : path,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
