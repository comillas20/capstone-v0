"use client";
import Header from "../components/Header";
import {
	createNewProduct,
	deleteProducts,
	editProduct,
	getAllProducts,
} from "./serverActions";
import Button from "../components/Button";
import { useEffect, useRef, useState, useTransition } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Products() {
	const headers = ["id", "name", "description", "isAvailable"];
	const { data, error, isLoading } = useSWR("getAllProducts", getAllProducts);
	const modalRef = useRef<HTMLDialogElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [isSaving, startSaving] = useTransition();
	const [isDeleting, startDeleting] = useTransition();
	const { mutate } = useSWRConfig();
	const [selectMode, setSelectMode] = useState(false);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const router = useRouter();
	let isAddingProduct: boolean = false;

	useEffect(() => {
		setSelectedRows([]);
	}, [selectMode]);

	return (
		<>
			<Header name="Products">
				<Button
					onClick={() => {
						if (isSaving) return;
						isAddingProduct = true;
						modalRef.current?.showModal();
					}}>
					{isSaving && isAddingProduct ? "Saving..." : "New +"}
				</Button>
				<Button
					className={
						selectMode
							? "bg-accentDark-700 px-2 py-1 text-sm text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
							: ""
					}
					onClick={() => setSelectMode(!selectMode)}>
					Select
				</Button>
			</Header>
			{isLoading ? (
				<div>Loading...</div>
			) : error ? (
				<div>An error occured {error}</div>
			) : (
				<div className="max-h-[69vh] w-full overflow-y-auto">
					<table className="w-full">
						<thead className="sticky top-0 bg-white">
							<tr>
								{headers.map((value, index) => (
									<th key={index}>{value}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((entries, dataIndex) => (
									<tr
										onClick={() => {
											if (selectMode) {
												const doesExist = selectedRows.find(e => e === entries.id);
												if (doesExist)
													setSelectedRows(prevSelectedRows =>
														prevSelectedRows.filter(e => e !== entries.id)
													);
												else
													setSelectedRows(prevSelectedRows => [
														...prevSelectedRows,
														entries.id,
													]);
											} else router.push("products/".concat(entries.name));
										}}
										key={dataIndex}
										className={twMerge(
											dataIndex % 2 == 1 ? "bg-brand-200/40" : "",
											" border-b border-brand-100 hover:bg-accentDark hover:text-white",
											selectedRows.find(e => e === entries.id)
												? "bg-accentDark-700 text-white"
												: ""
										)}>
										<td>{entries.id}</td>
										<td>{entries.name}</td>
										<td>{entries.description}</td>
										<td>{entries.isAvailable.toString()}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
			{selectMode && (
				<div className="mt-4 flex w-full flex-row justify-end gap-4">
					<Button
						disabled={selectedRows.length > 1 || selectedRows.length === 0}
						onClick={() => {
							if (isSaving) return;
							isAddingProduct = false;
							modalRef.current?.showModal();
						}}>
						{isSaving && !isAddingProduct ? "Saving..." : "Edit"}
					</Button>
					<Button
						disabled={selectedRows.length === 0}
						onClick={() =>
							startDeleting(async () => {
								const products = await deleteProducts(selectedRows);
								mutate("getAllProducts");
								if (products > 1) {
									alert("Products are successfully deleted!");
								} else if (products) {
									alert("The product is successfully deleted!");
								} else alert("The products were not deleted.");
							})
						}>
						{isDeleting ? "Deleting... " : "Delete"}
					</Button>
				</div>
			)}
			<dialog ref={modalRef}>
				<form
					action={e => {
						formRef.current?.reset();
						startSaving(async () => {
							if (isAddingProduct) {
								const product = await createNewProduct(e);
								if (product) {
									alert(product.name + " is successfully created!");
									mutate("getAllProducts");
								} else alert("The product was not created.");
							} else {
								if (!selectedRows[0]) return;
								const product = await editProduct(e, selectedRows[0]);
								if (product) {
									alert(product.name + " is successfully modified!");
									mutate("getAllProducts");
								} else alert("The product was not modified.");
							}
						});
					}}
					className="flex flex-col gap-4 p-4"
					ref={formRef}>
					<input
						type="text"
						placeholder="Product name"
						name="productName"
						required
						value={
							!isAddingProduct && data?.find(obj => obj.id === selectedRows[0])?.name
						}
					/>
					<textarea
						className="h-36 w-96 resize-none"
						placeholder="Description"
						name="productDesc"
						defaultValue={
							!isAddingProduct &&
							data?.find(obj => obj.id === selectedRows[0])?.description
						}></textarea>
					<label className="self-end">
						<input
							type="checkbox"
							name="availability"
							checked={
								!isAddingProduct &&
								data?.find(obj => obj.id === selectedRows[0])?.isAvailable
							}
						/>
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
