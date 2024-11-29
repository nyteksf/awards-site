import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "18.3.1",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-runtime": "error",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
];
