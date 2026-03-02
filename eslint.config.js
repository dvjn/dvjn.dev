import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    {
        rules: {
            // Astro's env.d.ts uses triple-slash path references — allow them
            "@typescript-eslint/triple-slash-reference": ["error", { path: "always" }],
        },
    },
    eslintConfigPrettier,
];
