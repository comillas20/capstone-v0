"use client";
import { twMerge } from "tailwind-merge";
type FloatingActionButtonProp = {
	children: React.ReactNode;
	className?: string;
	onclick: () => void;
};
export default function FloatingActionButton({
	children,
	className,
	onclick,
}: FloatingActionButtonProp) {
	return (
		<div
			className={twMerge(
				"fixed bottom-4 right-4 h-12 w-12 items-center justify-center rounded-[50%] border bg-accent text-white",
				className
			)}>
			<button onClick={onclick}>{children}</button>
		</div>
	);
}
