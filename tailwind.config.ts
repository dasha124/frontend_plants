import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/plant/**/*.{js,ts,jsx,tsx}',
		'./src/features/**/*.{js,ts,jsx,tsx}',
		'./src/widgets/**/*.{js,ts,jsx,tsx}',
		'./src/shared/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			screens: {
				pc: '1024px',
				tablet: '768px',
			},
			boxShadow: {
				input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
			},
			animation: {
				shimmer: 'shimmer 2s linear infinite',
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: '0 0',
					},
					to: {
						backgroundPosition: '-200% 0',
					},
				},
			},
		},
	},
};

export default config;
