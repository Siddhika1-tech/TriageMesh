
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.DATABASE_URL": JSON.stringify(
        env.DATABASE_URL
      ),
    },
    test: {
      environment: "node",
    },
  };
});