import React from "react";
import ProductRow from "./ProductRow";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

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
};

function ProductsTable({
	products,
	selectMode,
	setSelectMode,
	selectedRows,
	setSelectedRows,
}: ProductsTableProps) {
	const headers = ["ID", "Product name", "Category", "Availability"];
	const router = useRouter();
	let holdProductTimeout: NodeJS.Timeout;
	return (
		<>
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
									<td>{entries.category.name}</td>
									<td>{entries.isAvailable ? "Available" : "N/A"}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default ProductsTable;
