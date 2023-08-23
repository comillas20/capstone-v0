"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function Alert({
	children,
	messageType,
	className,
	onClose,
}: {
	children: React.ReactNode;
	messageType: "Normal" | "Success" | "Failed" | "Error";
	className?: string;
	onClose?: () => void;
}) {
	function alertStyles(messageType: string) {
		let className: string;
		switch (messageType) {
			case "Normal":
			default:
				className = "border-black bg-primaryLight text-black";
				break;
			case "Success":
				className = "border-lime-400 bg-lime-300 text-black";
				break;
			case "Failed":
			case "Error":
				className = "border-red-700 bg-red-600 text-white";
				break;
		}
		return className;
	}
	return (
		<div
			className={twMerge(
				"mb-4 flex w-full items-center justify-between rounded border p-4",
				alertStyles(messageType),
				className
			)}>
			<span>{children}</span>
			{onClose && (
				<button onClick={onClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
					</svg>
				</button>
			)}
		</div>
	);
}

export default Alert;
