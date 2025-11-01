import { type Config } from 'tailwindcss'

export const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				// Accent
				accent: '#f5f5f4',
				'accent-foreground': '#1c1917',

				// Primary
				primary: '#28cb8b',
				secondary: '#263238',
				info: '#2194f3',

				// Neutral
				silver: '#f5f7fa',
				white: '#ffffff',
				black: '#263238',

				// Action
				warning: '#fbc02d',
				error: '#e53835',
				success: '#2e7d31',
			},
			fontFamily: {
				sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
			},
			lineHeight: {
				base: '1.5',
			},
			fontWeight: {
				normal: '400',
			},
		},
	},
	plugins: [],
}

export default config
