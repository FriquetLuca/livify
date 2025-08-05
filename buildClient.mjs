import * as esbuild from "esbuild"
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const _ = await esbuild.build({
  entryPoints: ['src/client.ts'],
  outfile: "assets/livify.js",
  bundle: true,
  platform: "browser",
  format: "esm",
  external: [...Object.keys(pkg.dependencies || {}), "/_internal/mermaid.esm.min.mjs"],
  metafile: false,
  minify: true,
});
