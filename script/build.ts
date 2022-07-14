import { existsSync, mkdirSync, statSync } from "fs";
import path from "path";

import esbuild from "esbuild";
import copyStaticFilesPlugin from "esbuild-copy-static-files";
import elmPlugin from "esbuild-plugin-elm";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";

enum Directory {
  SOURCE = "./src",
  OUTPUT = "./dist",
  STATIC = "./static",
}

function pathFromSource(localPath: string) {
  return path.resolve(Directory.SOURCE, localPath);
}

function getBuildOptions({
  production,
  watch,
}: {
  production: boolean;
  watch: boolean;
}): esbuild.BuildOptions {
  return {
    entryPoints: {
      app: pathFromSource("app.ts"),
      "assets/style/main": pathFromSource("scss/main.scss"),
    },
    bundle: true,
    outdir: Directory.OUTPUT,
    minify: production,
    watch,
    sourcemap: !production && "inline",
    plugins: [
      copyStaticFilesPlugin({
        src: Directory.STATIC,
        dest: Directory.OUTPUT,
      }),
      elmPlugin({
        debug: !production,
        optimize: production,
        clearOnWatch: false,
      }),
      sassPlugin({
        type: "css",
        sourceMap: !production,
        async transform(source: string, _: string) {
          const { css } = await postcss([
            postcssPresetEnv({ stage: 2 }),
          ]).process(source);
          return css;
        },
      }),
    ],
  };
}

function checkOrCreateDirectory(dirpath: string) {
  if (!existsSync(dirpath)) {
    mkdirSync(dirpath, { recursive: true });
  }

  if (!statSync(dirpath).isDirectory()) {
    throw new Error(`"${dirpath}" already exists and is not a directory.`);
  }
}

(async function main() {
  const production = process.env.NODE_ENV === "production";
  const watch = process.argv.includes("--watch");
  const buildOptions = getBuildOptions({ production, watch });

  try {
    checkOrCreateDirectory(Directory.OUTPUT);
    await esbuild.build(buildOptions);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
})();
