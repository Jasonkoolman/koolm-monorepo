import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig((options) => ({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: [],
  esbuildPlugins: [sassPlugin()],
  ...options,
}));
