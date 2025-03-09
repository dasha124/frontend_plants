import path from 'path';
import { fileURLToPath } from 'url';

import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = [
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: [path.resolve(__dirname, './tsconfig.json')],
			},
			globals: {
				browser: true,
				es6: true,
				node: true,
				document: 'readonly',
			},
		},
		settings: {
			'import/parsers': {
				'@typescript-eslint/parser': [
					'.ts',
					'.tsx',
					'.css',
					'.svg',
					'.png',
					'.jpg',
				],
			},
			'import/resolver': {
				typescript: {
					project: path.resolve(__dirname, './tsconfig.json'),
				},
			},
			'import/external-module-folders': ['node_modules', 'node_modules/@types'],
			react: {
				version: 'detect',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			import: eslintPluginImport,
			prettier: eslintPluginPrettier,
			react: eslintPluginReact,
			'react-hooks': eslintPluginReactHooks,
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		rules: {
			...eslint.configs.recommended.rules,
			...typescriptEslint.configs['recommended'].rules,
			...eslintPluginReact.configs.recommended.rules,
			...eslintPluginReactHooks.configs.recommended.rules,
			'no-console': 'warn',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
						},
					],
					pathGroupsExcludedImportTypes: ['builtin'],
				},
			],
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
	{
		ignores: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.ts'],
	},
];
export default config;
