import React, { ComponentProps } from "react";
import { ProductData } from "./ProductsTable";

type ProductRowProps = {
	product: ProductData;
	className: string;
} & ComponentProps<"tr">;

function ProductRow({ product, className, ...props }: ProductRowProps) {
	return (
		<tr className={className} {...props}>
			<td>{product.id}</td>
			<td>{product.name}</td>
			<td>{product.category.name}</td>
			<td>{product.isAvailable ? "Available" : "N/A"}</td>
		</tr>
	);
}

export default ProductRow;
