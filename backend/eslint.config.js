import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-undef": "warn",
      "no-unused-vars": "warn",
      "no-redeclare": "error",
      "no-duplicate-imports": "error",
    },
  },

  pluginReact.configs.flat.recommended,
]);
