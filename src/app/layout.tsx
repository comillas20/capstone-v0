import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { setTheme, getPreferredTheme } from "../../lib/theme-modes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jakelou | Online Revervation and Catering",
	description:
		"Discover an effortless way to manage your catering needs and reservations online. Our system streamlines the entire process, allowing you to browse menus, select dishes, and make hassle-free reservations. Experience convenience and reliability with our user-friendly platform for all your catering and event planning requirements.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (typeof window !== "undefined") {
		const preferedTheme = getPreferredTheme();
		setTheme(preferedTheme);
		//if website theme is set to auto and user changes theme in their pc, then change the website theme according to new preference
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", () => {
				setTheme(getPreferredTheme());
			});
	}

	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
