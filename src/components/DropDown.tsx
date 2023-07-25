"use client";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropDownProps = {
	children: string[];
	className?: string;
	handler: (option: string) => void;
	icon?: React.ReactElement<HTMLOrSVGElement>;
};
export default function DropDown({
	icon,
	children,
	className,
	handler,
}: DropDownProps) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(children[0]);
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
				className="group flex items-center gap-1 px-2 py-1 font-light text-sm border border-accentDark-700 text-accentDark-700 bg-white hover:bg-accentDark-700 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-accentDark-700-700 focus-visible:text-white focus-visible:bg-accentDark-700 rounded-lg "
				onClick={() => setOpen(!open)}>
				{icon}
				{selected}
				<span className="inline-block ml-[0.255em] align-[0.255em] border-t-[0.3em] border-x-[0.3em] border-x-transparent border-b-0 border-solid border-accentDark-700 group-hover:border-y-white group-focus-visible:after:border-y-white"></span>
			</button>
			{open && (
				<ul className="absolute text-sm py-2 top-1 right-0 bottom-auto left-auto w-40 m-0 translate-x-0 translate-y-8 shadow-md bg-white">
					{children.map((child, index) => (
						<li className="hover:bg-accentDark-700 hover:text-white" key={index}>
							<button
								className="w-full text-left mx-4 my-1"
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
