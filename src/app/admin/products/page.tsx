import Header from "../components/Header";
import Link from "next/link";
import NewProductModal from "./NewProductModal";
import { getAllProducts } from "./serverActions";
import Button from "../components/Button";
export default async function Products() {
	const headers = ["id", "name", "description", "isAvailable"];
	const data = await getAllProducts();
	return (
		<>
			<Header name="Products">
				<NewProductModal></NewProductModal>
				<Button>Delete</Button>
			</Header>
			<div className="h-[69vh] w-full overflow-y-auto">
				<table className="w-full">
					<thead className="sticky top-0 bg-white">
						<tr>
							{headers.map((value, index) => (
								<th key={index}>{value}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((entries, dataIndex) => (
							<tr
								key={dataIndex}
								className={(dataIndex % 2 == 1 ? "bg-brand-200/40" : "").concat(
									" border-b border-brand-100"
								)}>
								<td>{entries.id}</td>
								<td>
									<Link href={"products/".concat(entries.id)}>{entries.name}</Link>
								</td>
								<td>{entries.description}</td>
								<td>{entries.isAvailable.toString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
