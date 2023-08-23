"use client";
import Header from "../components/Header";
import {
	createNewProduct,
	deleteProducts,
	getAllProducts,
} from "./serverActions";
import Button from "../components/Button";
import { useEffect, useRef, useState, useTransition } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Alert from "@components/Alert";

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
	const [notification, setNotification] = useState<{
		visibility: boolean;
		text: string;
		msgType: "Success" | "Failed" | "Error" | "Normal";
	}>({
		visibility: false,
		text: "",
		msgType: "Normal",
	});
	const router = useRouter();
	let holdProductTimeout: NodeJS.Timeout;

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
						modalRef.current?.showModal();
					}}>
					{isSaving ? "Saving..." : "New +"}
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
												if (doesExist) {
													setSelectedRows(prevSelectedRows => {
														const newSelectedRows = prevSelectedRows.filter(
															e => e !== entries.id
														);
														if (newSelectedRows.length === 0) {
															setSelectMode(false);
														}
														return newSelectedRows;
													});
												} else
													setSelectedRows(prevSelectedRows => [
														...prevSelectedRows,
														entries.id,
													]);
											} else router.push("products/".concat(entries.name));
										}}
										onMouseDown={() => {
											holdProductTimeout = setTimeout(() => {
												setSelectMode(true);
											}, 1000);
										}}
										onMouseUp={() => {
											clearTimeout(holdProductTimeout);
										}}
										onTouchStart={() => {
											holdProductTimeout = setTimeout(() => {
												setSelectMode(prevMode => {
													const doesExist = selectedRows.find(e => e === entries.id);
													if (doesExist) {
														setSelectedRows(prevSelectedRows => {
															const newSelectedRows = prevSelectedRows.filter(
																e => e !== entries.id
															);
															if (newSelectedRows.length === 0) {
																setSelectMode(false);
															}
															return newSelectedRows;
														});
													} else
														setSelectedRows(prevSelectedRows => [
															...prevSelectedRows,
															entries.id,
														]);
													return true;
												});
											}, 1000);
										}}
										onTouchEnd={() => {
											clearTimeout(holdProductTimeout);
										}}
										onTouchCancel={() => {
											clearTimeout(holdProductTimeout);
										}}
										key={dataIndex}
										className={twMerge(
											dataIndex % 2 == 1 ? "bg-brand-200/40" : "",
											" border-b border-brand-100 hover:cursor-pointer hover:bg-accentDark hover:text-white",
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
					{selectMode && <Button onClick={() => setSelectMode(false)}>Clear</Button>}
					<Button
						disabled={selectedRows.length === 0}
						onClick={() =>
							startDeleting(async () => {
								const products = await deleteProducts(selectedRows);

								if (products > 1) {
									setNotification({
										visibility: true,
										text: "Products selected are successfully deleted!",
										msgType: "Success",
									});
								} else if (products) {
									setNotification({
										visibility: true,
										text:
											"The product " +
											data?.find(e => e.id === selectedRows[0])?.name +
											" is successfully deleted!",
										msgType: "Success",
									});
								} else
									setNotification({
										visibility: true,
										text: "The products were not deleted.",
										msgType: "Failed",
									});
								mutate("getAllProducts");
								setSelectMode(false);
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
							const product = await createNewProduct(e);
							if (product) {
								setNotification({
									visibility: true,
									text: "The product is successfully created!",
									msgType: "Success",
								});
								mutate("getAllProducts");
							} else
								setNotification({
									visibility: true,
									text: "The product creation failed.",
									msgType: "Failed",
								});
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
