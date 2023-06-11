module.exports = {
  extends: ["next", "turbo", "airbnb", "plugin:prettier/recommended"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "react/button-has-type": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-filename-extension": [2, { extensions: [".ts", ".tsx"] }],
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useCustomHook)",
      },
    ],
  },
  ignorePatterns: ["**/dist/**/*"],
};
