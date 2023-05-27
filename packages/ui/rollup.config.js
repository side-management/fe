const esbuild = require("rollup-plugin-esbuild");
const preserveDirectives = require("rollup-plugin-preserve-directives");
const typescript = require("@rollup/plugin-typescript");

module.exports = {
  input: "./src/index.tsx",
  output: {
    dir: "dist",
    format: "cjs",
    preserveModules: true,
  },
  plugins: [
    typescript.default(),
    esbuild.default({
      minify: process.env.NODE_ENV === "production",
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: "tsconfig.json",
      loaders: {
        ".json": "json",
        ".js": "jsx",
      },
    }),
    preserveDirectives.default(),
  ],
};
