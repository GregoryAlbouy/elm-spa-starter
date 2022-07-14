import { runBuild } from "./common/run-build";

(async function main() {
  await runBuild({
    production: process.env.NODE_ENV === "production",
    watch: false,
  });
})();
