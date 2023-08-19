"use client";

import { useRef, useState } from "react";

type EditableTextProp = {
	initialText: string;
	tag: keyof JSX.IntrinsicElements;
};
export default function EditableText({ initialText, tag }: EditableTextProp) {
	const HTMLTag = tag;
	const [text, setText] = useState(initialText);
	const dialog = useRef<HTMLDialogElement>(null);
	const textarea = useRef<HTMLTextAreaElement>(null);
	function setNewText() {
		if (dialog.current) {
			dialog.current.close();
		}
		if (textarea.current) {
			setText(textarea.current.value);
		}
	}
	return (
		<div>
			<dialog ref={dialog} className="p-4">
				<form method="dialog" onSubmit={setNewText} className="flex flex-col">
					<textarea
						defaultValue={text}
						className="h-36 w-96 resize-none"
						ref={textarea}
					/>
					<div className="flex flex-row justify-end gap-4">
						<input
							type="button"
							value="Cancel"
							className="mt-2 p-2"
							onClick={() => dialog.current?.close()}
						/>
						<input
							type="submit"
							value="Save"
							className="mt-2 bg-accentDark p-2 text-white"
						/>
					</div>
				</form>
			</dialog>
			<HTMLTag>
				{text}
				<button className="ml-4" onClick={() => dialog.current?.showModal()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
						<path
							fillRule="evenodd"
							d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
						/>
					</svg>
				</button>
			</HTMLTag>
		</div>
	);
}
