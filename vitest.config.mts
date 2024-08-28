import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./test/setup.ts"],
    env: loadEnv(mode, process.cwd(), ""),
    environment: "node",
  },
}));
