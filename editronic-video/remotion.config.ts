/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Entorno sin descarga de Chrome: usar el headless shell preinstalado si existe.
const preinstalled = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
// eslint-disable-next-line @typescript-eslint/no-require-imports
if (require("fs").existsSync(preinstalled)) {
  Config.setBrowserExecutable(preinstalled);
}
