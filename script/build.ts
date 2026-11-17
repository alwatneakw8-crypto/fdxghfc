import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import path from "path";

async function buildAll() {
  const distDir = path.resolve(import.meta.dirname, "..", "dist");
  await rm(distDir, { recursive: true, force: true });

  console.log("Building client...");
  await viteBuild();

  console.log("Building server...");
  await esbuild({
    entryPoints: [path.resolve(import.meta.dirname, "..", "server", "index.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.resolve(distDir, "index.cjs"),
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    packages: "external",
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
