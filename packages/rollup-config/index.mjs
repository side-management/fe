import esbuild from "rollup-plugin-esbuild";
import preserveDirectives from "rollup-plugin-preserve-directives";
import dts from "rollup-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const EXTERNALS = { ...pkg.dependencies, ...pkg.peerDependencies };

/** @type {import('rollup').RollupOptions} */
const SHARED_CONFIGS = {
  external: Object.keys(EXTERNALS || {}),
  input: "./src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
};

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const createConfig = (config) => {
  return {
    ...SHARED_CONFIGS,
    ...config,
  };
};
/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
export const getRollupConfig = (config) => {
  fs.rmSync("./dist", { force: true, recursive: true });
  return [
    createConfig({
      plugins: [
        nodeResolve(),
        commonjs(),
        esbuild({
          jsx: "automatic",
        }),
        preserveDirectives(),
      ],
      ...config,
    }),
    createConfig({
      plugins: [dts()],
      ...config,
    }),
  ];
};
