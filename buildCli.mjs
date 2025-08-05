import * as esbuild from "esbuild"

const _ = await esbuild.build({
  entryPoints: ['src/livify.ts'],
  outfile: "bin/livify.js",
  bundle: true,
  platform: "node",
  format: "cjs",
  external: ["jsdom"],
  minify: true,
});
