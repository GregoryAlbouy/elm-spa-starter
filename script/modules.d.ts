declare module "esbuild-copy-static-files" {
  import type esbuild from "esbuild";

  interface CopyStaticFilesPluginOptions {
    /**
     * Source path to copy.
     */
    src?: string;

    /**
     * Destination path to copy to.
     */
    dest?: string;

    /**
     * Dereference symlinks.
     */
    dereference?: boolean;

    /**
     * When `force` is `false` and the destination exists, throw an error.
     */
    errorOnExist?: boolean;

    /**
     * Function to filter copied files / directories.
     * Return true to copy the item, false to ignore it.
     */
    filter?: (src: string, dest: string) => boolean;

    /**
     * Overwrite existing file or directory.
     * The copy operation will ignore errors if you set this to `false`.
     * and the destination exists. Use the `errorOnExist` option
     * to change this behavior.
     */
    force?: boolean;

    /**
     * When `true` timestamps from `src` will be preserved.
     */
    preserveTimestamps?: boolean;

    /**
     * Copy directories recursively.
     */
    recursive?: boolean;
  }

  export default function (
    options?: CopyStaticFilesPluginOptions
  ): esbuild.Plugin;
}

declare module "esbuild-plugin-elm" {
  import type esbuild from "esbuild";

  interface ElmPluginOptions {
    /**
     * Enable the time-travelling debugger
     * @default false
     */
    debug?: boolean;

    /**
     * Optimize the js output
     * @default NODE_ENV === 'production'
     */
    optimize?: boolean;

    /**
     * Specifiy an explicit path to the elm executable
     * @default 'node_modules/.bin/elm' || 'elm'
     */
    pathToElm?: string;

    /**
     * Clear the console before re-building on file changes
     * @default false
     */
    clearOnWatch?: boolean;

    /**
     * The current working directory/elm project root
     * @default './'
     */
    cwd?: string;
  }

  export default function (options?: ElmPluginOptions): esbuild.Plugin;
}
