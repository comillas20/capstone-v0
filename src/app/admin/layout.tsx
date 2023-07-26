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
	}
	return (
		<div className="grid h-screen grid-cols-12">
			<Navigation
				className={isDisplayed ? "fixed z-50 block" : "static hidden"}></Navigation>
			<main className="col-span-12 bg-white p-4 md:col-span-9 lg:col-span-10">
				{children}
			</main>
			{/* MOBILE ONLY */}
			<FloatingActionButton className="z-50 flex md:hidden" onclick={showNav}>
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
