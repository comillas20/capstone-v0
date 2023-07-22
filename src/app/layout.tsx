import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
