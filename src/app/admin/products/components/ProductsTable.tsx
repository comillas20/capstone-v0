import React, { useEffect, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@app/admin/components/Button";
import { deleteCategory, deleteProducts, getCategory } from "../serverActions";
import { useSWRConfig } from "swr";

export interface ProductData {
	category: {
		id: string;
		name: string;
	};
	id: string;
	name: string;
	imgUrl: string | null;
	description: string;
	isAvailable: boolean;
}

type ProductsTableProps = {
	products: ProductData[] | undefined;
	selectMode: boolean;
	setSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
	selectedRows: string[];
	setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
	selectedCategory: string;
	setNotification: React.Dispatch<
		React.SetStateAction<{
			visibility: boolean;
			text: string;
			msgType: "Success" | "Failed" | "Error" | "Normal";
		}>
	>;
	className?: string;
};

function ProductsTable({
	products,
	selectMode,
	setSelectMode,
	selectedRows,
	setSelectedRows,
	selectedCategory,
	setNotification,
	className,
}: ProductsTableProps) {
	const headers = ["Dish", "Category", "Availability"];
	const [isDeleting, startDeleting] = useTransition();
	const { mutate } = useSWRConfig();
	let holdProductTimeout: NodeJS.Timeout;

	const [sortedBy, setSortedBy] = useState({ sorter: "", orderType: "" });
	function sortTable(sorter: string) {
		if (sorter === sortedBy.sorter) {
			setSortedBy({
				sorter: sorter,
				orderType: sortedBy.orderType === "asc" ? "desc" : "asc",
			});
			products?.reverse();
		} else {
			setSortedBy({ sorter: sorter, orderType: "asc" });
			products?.sort((a, b) => {
				switch (sorter) {
					case headers[0]:
					default:
						return a.name.localeCompare(b.name);
					case headers[1]:
						return a.category.name.localeCompare(b.category.name);
					case headers[2]:
						const numA = a.isAvailable ? 1 : 0;
						const numB = b.isAvailable ? 1 : 0;
						return numB - numA;
				}
			});
		}
	}
	return (
		<div className={className}>
			<div className="overflow-y-auto">
				<table className="w-full">
					<thead className="sticky top-0">
						<tr>
							{headers.map((value, index) => (
								<th
									key={index}
									className="cursor-pointer select-none"
									onClick={() => sortTable(value)}>
									{value}
									{sortedBy.sorter === value && (
										<span
											className={twMerge(
												"ml-[0.255em] inline-block border-x-[0.3em] border-solid border-black border-x-transparent align-[0.255em]",
												sortedBy.orderType === "asc"
													? "border-b-0 border-t-[0.3em]"
													: "border-b-[0.3em] border-t-0"
											)}></span>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{products &&
							products.map((entries, dataIndex) => (
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
										}
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
										dataIndex % 2 == 1 ? "border border-brand-100 bg-brand/10" : "",
										"rounded-md p-1 hover:bg-accentDark hover:text-white",
										selectedRows.find(e => e === entries.id)
											? "bg-accentDark-700 text-white"
											: ""
									)}>
									<td>
										<Link
											className="hover:underline"
											href={
												"products/".concat(entries.id)
												/* Using name as params instead of ID is hard mainly because 
											I dont know how to make prisma/planetscale query case insensitive.
											*/
											}>
											{entries.name}
										</Link>
									</td>
									<td>{entries.category.name}</td>
									<td>{entries.isAvailable ? "Available" : "N/A"}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{/* Options that occur when selection mode is on */}
			{selectMode && (
				<div className="mt-4 flex w-full flex-row justify-end gap-4">
					{selectMode && <Button onClick={() => setSelectMode(false)}>Clear</Button>}
					<Button
						disabled={selectedRows.length === 0}
						onClick={() =>
							startDeleting(async () => {
								const deletedProducts = await deleteProducts(selectedRows);
								const category = await getCategory(selectedCategory);

								if (deletedProducts) {
									if (category?.product.length === 0) {
										await deleteCategory(selectedCategory);
									}
									const msg =
										deletedProducts > 1
											? "Products selected are successfully deleted!"
											: "The product " +
											  products?.find(e => e.id === selectedRows[0])?.name +
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
		</div>
	);
}

export default ProductsTable;
