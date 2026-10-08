import { defineConfig } from "vitest/config";
import path from "node:path";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.DATABASE_URL": JSON.stringify(env.DATABASE_URL),
    },
    test: {
      environment: "node",
    },
  };
});