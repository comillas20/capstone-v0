"use client";
import { useState } from "react";

type DropDownProps = {
	children: { name: string; onclick: () => void }[];
	className?: string;
	icon?: React.ReactElement<HTMLOrSVGElement>;
};
export default function DropDown({ icon, children, className }: DropDownProps) {
	let defaultName = children[0].name;
	const [open, setOpen] = useState(false);
	return (
		<div className={className}>
			<button
				className="flex items-center gap-1 px-2 py-1 text-base font-normal text-black bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 rounded-lg after:inline-block after:ml-[0.255em] after:align-[0.255em] after:border-t-[0.3em] after:border-x-[0.3em] after:border-x-transparent after:border-b-0 after:border-solid after:border-t-cyan-400"
				onClick={() => setOpen(!open)}>
				{icon}
				{defaultName}
			</button>
			<ul
				className={"absolute py-2 inset=[0px 0px auto auto] m-0 translate-x-0 translate-y-8 shadow".concat(
					open ? " block" : " hidden"
				)}>
				{children.map((child, index) => (
					<li className="w-100 px-4 py-1" key={index}>
						<button
							onClick={() => {
								child.onclick;
								setOpen(!open);
							}}></button>
					</li>
				))}
			</ul>
		</div>
	);
}
