import path from "path";

import esbuild from "esbuild";
import copyStaticFilesPlugin from "esbuild-copy-static-files";
import elmPlugin from "esbuild-plugin-elm";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";

const watch = process.argv.includes("--watch");
const isProduction = process.env.NODE_ENV === "production";

const SRC_DIR = "./src";
const OUT_DIR = "./dist";
const STATIC_DIR = "./static";

function fromSource(localPath: string) {
  return path.resolve(SRC_DIR, localPath);
}

(function main() {
  esbuild
    .build({
      entryPoints: {
        app: fromSource("app.ts"),
        "assets/style/main": fromSource("scss/main.scss"),
      },
      bundle: true,
      outdir: OUT_DIR,
      minify: isProduction,
      watch,
      sourcemap: !isProduction && "inline",
      plugins: [
        copyStaticFilesPlugin({
          src: STATIC_DIR,
          dest: OUT_DIR,
        }),
        elmPlugin({
          debug: !isProduction,
          optimize: isProduction,
          clearOnWatch: watch,
        }),
        sassPlugin({
          type: "css",
          sourceMap: !isProduction,
          async transform(source: string, _: string) {
            const { css } = await postcss([
              postcssPresetEnv({ stage: 2 }),
            ]).process(source);
            return css;
          },
        }),
      ],
    })
    .catch(() => process.exit(1));
})();
