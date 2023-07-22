"use client";
import { useState } from "react";
import FloatingActionButton from "../../components/FloatingActionButton";
import Navigation from "./components/Navigation";

export async function generateMetadata() {
	return {
		title: "Jakelou - Admin",
		description: "Admin dashboard for management",
	};
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isDisplayed, setDisplay] = useState(false);
	function showNav() {
		setDisplay(!isDisplayed);
		console.log("hello" + isDisplayed);
	}
	return (
		<div className="grid grid-cols-12 h-screen">
			<Navigation
				className={isDisplayed ? "fixed block" : "static hidden"}></Navigation>
			<main className="col-span-12 md:col-span-9 lg:col-span-10 p-4 bg-white">
				{children}
			</main>
			{/* MOBILE ONLY */}
			<FloatingActionButton className="flex md:hidden z-50" onclick={showNav}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16">
					<path
						fillRule="evenodd"
						d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
					/>
				</svg>
			</FloatingActionButton>
		</div>
	);
}
