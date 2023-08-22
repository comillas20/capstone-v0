"use client";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropDownProps = {
	children: string[];
	className?: string;
	handler: (option: string) => void;
	defaultSelected: string;
	icon?: React.ReactElement<HTMLOrSVGElement>;
};
export default function DropDown({
	icon,
	children,
	className,
	handler,
	defaultSelected,
}: DropDownProps) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(defaultSelected);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	function optionOnClick(option: string) {
		setSelected(option);
		handler(option);
		setOpen(!open);
	}
	return (
		<div className={twMerge("relative", className)} ref={ref}>
			<button
				className="group flex items-center gap-1 rounded-lg border border-accentDark-700 bg-accentDark px-2 py-1 text-sm font-light text-white hover:bg-accentDark-700  focus-visible:bg-accentDark-700  focus-visible:outline focus-visible:outline-1 focus-visible:outline-accentDark-700 disabled:border-gray-400 disabled:bg-gray-400"
				onClick={() => setOpen(!open)}>
				{icon}
				{selected}
				<span className="ml-[0.255em] inline-block border-x-[0.3em] border-b-0 border-t-[0.3em] border-solid border-white border-x-transparent align-[0.255em] group-hover:border-y-white group-focus-visible:after:border-y-white"></span>
			</button>
			{open && (
				<ul className="absolute bottom-auto left-auto right-0 top-1 z-10 m-0 w-40 translate-x-0 translate-y-8 rounded-md border border-accentDark-700 bg-white py-2 text-sm shadow-md">
					{children.map((child, index) => (
						<li
							className={
								selected === child
									? "bg-accentDark-700 text-white"
									: "hover:bg-accentDark-700 hover:text-white"
							}
							key={index}>
							<button
								className="mx-4 my-1 w-full text-left"
								onClick={() => optionOnClick(child)}>
								{child}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
