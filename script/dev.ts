import { spawn } from "child_process";

import { Directory, LOCAL_PORT } from "./common/config";
import { runBuild } from "./common/run-build";

(async function main() {
  await runBuild({
    production: process.env.NODE_ENV === "production",
    watch: true,
  });
  serveDist();
})();

export function serveDist() {
  const SPA_FALLBACK = "index.html";

  const server = spawn("http-server-spa", [
    Directory.OUTPUT,
    SPA_FALLBACK,
    LOCAL_PORT,
  ]);

  server.stdout.on("data", (buffer: Buffer) => {
    console.log(buffer.toString());
  });

  server.stderr.on("data", (buffer: Buffer) => {
    console.error(buffer.toString());
    process.exit(1);
  });
}
