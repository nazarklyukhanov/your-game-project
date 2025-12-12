const globals = require("globals");
const pluginJs = require("@eslint/js");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			"prettier/prettier": "error",
			"no-unused-vars": "warn",
			"no-undef": "error",
		},
	},
];
