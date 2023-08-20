"use client";
import { useRef, useTransition } from "react";
import { createNewProduct } from "./serverActions";
import Button from "../components/Button";

function NewProductModal() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();
	return (
		<>
			<Button
				onClick={() => {
					if (isPending) return;
					modalRef.current?.showModal();
				}}>
				{isPending ? "Saving..." : "New +"}
			</Button>
			<dialog ref={modalRef}>
				<form
					action={e => {
						formRef.current?.reset();
						startTransition(async () => {
							const product = await createNewProduct(e);
							if (product) {
								alert(product.name + " is successfully created!");
							} else alert("The product was not created.");
						});
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
