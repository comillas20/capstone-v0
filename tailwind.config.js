/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				brand: {
					100: "#EB5C68",
					300: "#E94957",
					DEFAULT: "#e63946",
					700: "#E42535",
					900: "#DA1B2B",
				},
				primaryLight: {
					DEFAULT: "#f1faee",
				},
				primaryDark: {
					DEFAULT: "#1d3557",
				},
				accentLight: {
					100: "#F5D2B8",
					300: "#F0BC94",
					DEFAULT: "#a8dadc",
					700: "#EBA570",
					900: "#E68F4C",
				},
				accentDark: {
					100: "#2D808B",
					300: "#23636C",
					DEFAULT: "#457b9d",
					700: "#19474D",
					900: "#0F2B2E",
				},
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
