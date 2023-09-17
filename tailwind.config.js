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
				primary: {
					light: "#f1faee",
					dark: "#1d3557",
				},
				accent: {
					100: "#5590B4",
					300: "#4B86AA",
					DEFAULT: "#457b9d",
					700: "#3E6F8E",
					900: "#386480",
				},
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
