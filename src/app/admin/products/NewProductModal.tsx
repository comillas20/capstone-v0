"use client";
import { useRef, useTransition } from "react";
import { createNewProduct } from "./serverActions";

function NewProductModal() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();
	return (
		<>
			<button
				className="focus-visible:outline-accentDark-700-700 group flex items-center gap-1 rounded-lg border border-accentDark-700 bg-white px-2 py-1 text-sm font-light text-accentDark-700 hover:bg-accentDark-700 hover:text-white focus-visible:bg-accentDark-700 focus-visible:text-white focus-visible:outline focus-visible:outline-1"
				onClick={() => {
					if (isPending) return;
					modalRef.current?.showModal();
				}}>
				{isPending ? "Saving..." : "New +"}
			</button>
			<dialog ref={modalRef}>
				<form
					action={e => {
						formRef.current?.reset();
						startTransition(() => createNewProduct(e));
					}}
					className="flex flex-col gap-4 p-4"
					ref={formRef}>
					<input
						type="text"
						placeholder="Product name"
						name="productName"
						required
					/>
					<textarea
						className="h-36 w-96 resize-none"
						placeholder="Description"
						name="productDesc"></textarea>
					<label className="self-end">
						<input type="checkbox" name="availability" />
						Available
					</label>

					<div className="flex flex-row justify-end gap-4">
						<input
							type="button"
							value="Cancel"
							className="p-2"
							onClick={() => modalRef.current?.close()}
						/>
						<input
							type="submit"
							value="Save"
							className="bg-accentDark p-2 text-white"
							onClick={() => modalRef.current?.close()}
						/>
					</div>
				</form>
			</dialog>
		</>
	);
}

export default NewProductModal;
