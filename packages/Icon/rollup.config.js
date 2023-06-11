import { getRollupConfig } from "rollup-config";
import svgr from "@svgr/rollup";

export default getRollupConfig((config) => ({
  ...config,
  plugins: [...config.plugins, svgr()],
}));
