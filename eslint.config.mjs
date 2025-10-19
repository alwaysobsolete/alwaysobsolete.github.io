import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { fileURLToPath } from "node:url";

// Use .gitignore
const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

// Legacy compatibility
const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = defineConfig([
	...compat.config({
		extends: ["next/core-web-vitals", "next/typescript"],
	}),
	includeIgnoreFile(gitignorePath),
	globalIgnores(["public/**/*"]),
	eslintPluginPrettierRecommended,
	{
		rules: {
			semi: "error",
		},
	},
]);

export default eslintConfig;
