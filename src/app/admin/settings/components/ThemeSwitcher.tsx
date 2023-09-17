"use client";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { setTheme } from "../../../../../lib/theme-modes";
import { twJoin } from "tailwind-merge";

export default function ThemeSwitcher() {
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		setTheme(enabled ? "dark" : "light");
	}, [enabled]);
	return (
		<div>
			Dark Mode{" "}
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={twJoin(
					enabled
						? "bg-accent-900 dark:bg-accent-100"
						: "bg-accent-700 dark:bg-accent-300",
					"relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
				)}>
				<span className="sr-only">Use dark mode</span>
				<span
					aria-hidden="true"
					className={twJoin(
						enabled ? "translate-x-4" : "translate-x-0",
						"pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out dark:bg-white"
					)}
				/>
			</Switch>
		</div>
	);
}
