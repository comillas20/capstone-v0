import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
	children?: React.ReactNode;
	className?: string;
} & ComponentProps<"button">;
function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={twMerge(
				"group flex items-center gap-1 rounded-lg border border-accentDark-700 bg-accentDark px-2 py-1 text-sm font-light text-white shadow-lg  hover:bg-accentDark-700  focus-visible:bg-accentDark-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accentDark-700 disabled:border-gray-400 disabled:bg-gray-400",
				className
			)}
			{...props}>
			{children}
		</button>
	);
}

export default Button;
