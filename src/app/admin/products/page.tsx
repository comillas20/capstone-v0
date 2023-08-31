"use client";
import Header from "../components/Header";
import {
	createNewProduct,
	deleteCategory,
	deleteProducts,
	getAllCategories,
	getAllProducts,
	getCategory,
} from "./serverActions";
import Button from "../components/Button";
import { useEffect, useRef, useState, useTransition } from "react";
import useSWR, { useSWRConfig } from "swr";
import Alert from "@components/Alert";
import { Combobox } from "@headlessui/react";
import ProductsTable from "./components/ProductsTable";

export default function Products() {
	const allProducts = useSWR(
		"getAllProducts",
		() =>
			getAllProducts({ id: true, name: true, category: true, isAvailable: true }),
		{
			revalidateOnReconnect: true,
		}
	);
	const allCategories = useSWR("getAllCategories", getAllCategories);
	const newProductModalRef = useRef<HTMLDialogElement>(null);
	const newProductFormRef = useRef<HTMLFormElement>(null);
	const [isSaving, startSaving] = useTransition();
	const [isDeleting, startDeleting] = useTransition();
	const { mutate } = useSWRConfig();
	const [selectMode, setSelectMode] = useState(false);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [categoryQuery, setCategoryQuery] = useState("");

	const filteredCategories =
		categoryQuery === ""
			? allCategories.data
			: allCategories.data?.filter(category => {
					return category.name.toLowerCase().includes(categoryQuery.toLowerCase());
			  });
	const [notification, setNotification] = useState<{
		visibility: boolean;
		text: string;
		msgType: "Success" | "Failed" | "Error" | "Normal";
	}>({
		visibility: false,
		text: "",
		msgType: "Normal",
	});

	useEffect(() => {
		if (!selectMode && selectedRows.length != 0) {
			setSelectedRows([]);
		}
	}, [selectMode]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (notification.visibility)
				setNotification({ visibility: false, text: "", msgType: "Normal" });
			else {
				clearTimeout(timeout);
			}
		}, 5000);
	}, [notification.visibility]);

	return (
		<>
			<Header name="Products">
				<Button
					onClick={() => {
						if (isSaving) return;
						newProductModalRef.current?.showModal();
					}}>
					{isSaving ? "Saving..." : "New product"}
				</Button>
			</Header>
			{notification.visibility && (
				<Alert
					messageType={notification.msgType}
					onClose={() => {
						setNotification({ visibility: false, text: "", msgType: "Normal" });
					}}>
					{notification.text}
				</Alert>
			)}
			{allProducts.isLoading ? (
				<div>Loading...</div>
			) : allProducts.error ? (
				<div>
					<span>
						An error occured. Please{" "}
						<button
							className="text-blue-500 underline hover:text-blue-700"
							onClick={() => window.location.reload()}>
							reload
						</button>{" "}
						the list.
					</span>
					<p>{allProducts.error}</p>
				</div>
			) : (
				<ProductsTable
					products={allProducts.data}
					selectMode={selectMode}
					setSelectMode={setSelectMode}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			)}
			{selectMode && (
				<div className="mt-4 flex w-full flex-row justify-end gap-4">
					{selectMode && <Button onClick={() => setSelectMode(false)}>Clear</Button>}
					<Button
						disabled={selectedRows.length === 0}
						onClick={() =>
							startDeleting(async () => {
								const products = await deleteProducts(selectedRows);
								const category = await getCategory(selectedCategory);

								if (products) {
									if (category?.product.length === 0) {
										await deleteCategory(selectedCategory);
									}
									const msg =
										products > 1
											? "Products selected are successfully deleted!"
											: "The product " +
											  allProducts.data?.find(e => e.id === selectedRows[0])?.name +
											  " is successfully deleted!";

									setNotification({
										visibility: true,
										text: msg,
										msgType: "Success",
									});
								} else
									setNotification({
										visibility: true,
										text: "The products were not deleted.",
										msgType: "Failed",
									});
								mutate("getAllProducts");
								mutate("getAllCategories");
								setSelectMode(false);
							})
						}>
						{isDeleting ? "Deleting... " : "Delete"}
					</Button>
				</div>
			)}

			{/* Modal for creating new products */}
			<dialog ref={newProductModalRef} className="rounded-md p-4">
				<h2 className="mb-4">Create a new product</h2>
				<form
					action={e => {
						newProductModalRef.current?.close();
						newProductFormRef.current?.reset();
						startSaving(async () => {
							const product = await createNewProduct(e);
							if (product) {
								setNotification({
									visibility: true,
									text: "The product is successfully created!",
									msgType: "Success",
								});
								mutate("getAllProducts");
								mutate("getAllCategories");
							} else
								setNotification({
									visibility: true,
									text: "The product creation failed.",
									msgType: "Failed",
								});
						});
					}}
					className="flex flex-col gap-4"
					ref={newProductFormRef}>
					<input
						type="text"
						placeholder="Product name"
						name="productName"
						className="rounded-md border border-black p-2"
						required
					/>
					<textarea
						className="h-36 w-96 resize-none rounded-md border border-black p-2"
						placeholder="Description"
						name="productDesc"></textarea>
					<Combobox
						as="div"
						value={selectedCategory}
						onChange={setSelectedCategory}
						className="rounded-md border border-black p-2"
						name="categoryName">
						<div className="flex items-center justify-between gap-4">
							<Combobox.Input
								className="flex-grow"
								onChange={event => {
									setSelectedCategory(event.target.value);
									setCategoryQuery(event.target.value);
								}}
								placeholder="--Choose category--"
								required
							/>
							<Combobox.Button className="mx-4 inline-block border-x-[0.3em] border-b-0 border-t-[0.3em] border-solid border-black border-x-transparent align-[0.255em]"></Combobox.Button>
						</div>

						<Combobox.Options>
							{filteredCategories?.map(category => (
								<Combobox.Option key={category.id} value={category.name}>
									{category.name}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Combobox>
					<label className="select-none self-end rounded-md border border-black p-2">
						<input type="checkbox" name="availability" /> Available
					</label>

					<div className="flex flex-row justify-end gap-4">
						<input
							type="button"
							value="Cancel"
							className="border border-accentDark p-2"
							onClick={() => {
								newProductFormRef.current?.reset();
								newProductModalRef.current?.close();
							}}
						/>
						<input
							type="submit"
							value="Save"
							className="bg-accentDark p-2 text-white"
						/>
					</div>
				</form>
			</dialog>
		</>
	);
}
