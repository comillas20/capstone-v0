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
				"fixed items-center justify-center right-4 bottom-4 rounded-[50%] w-12 h-12 border bg-brand text-white",
				className
			)}>
			<button onClick={onclick}>{children}</button>
		</div>
	);
}
