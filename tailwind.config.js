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
					100: "#FFC2C8",
					200: "#FE9AA4",
					300: "#FE717F",
					DEFAULT: "#FE485A",
					500: "#FE2036",
					600: "#F40119",
					700: "#C20114",
				},
				accentDark: {
					100: "#2D808B",
					200: "#28727B",
					300: "#23636C",
					DEFAULT: "#1E555C",
					500: "#19474D",
					600: "#14393E",
					700: "#0F2B2E",
				},
				primaryLight: {
					DEFAULT: "#F4D8CD",
				},
				primaryDark: {
					DEFAULT: "#3A2E39",
				},
				accentLight: {
					100: "#F5D2B8",
					200: "#F2C7A6",
					300: "#F0BC94",
					DEFAULT: "#EDB183",
					500: "#EBA570",
					600: "#E89A5E",
					700: "#E68F4C",
				},
			},
		},
	},
	plugins: [],
};
