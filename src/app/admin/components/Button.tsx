import { twMerge } from "tailwind-merge";

type ButtonProps = {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
};
function Button({ onClick, children, className }: ButtonProps) {
	return (
		<button
			className={twMerge(
				"focus-visible:outline-accentDark-700-700 group flex items-center gap-1 rounded-lg border border-accentDark-700 bg-white px-2 py-1 text-sm font-light text-accentDark-700 hover:bg-accentDark-700 hover:text-white focus-visible:bg-accentDark-700 focus-visible:text-white focus-visible:outline focus-visible:outline-1",
				className
			)}
			onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
