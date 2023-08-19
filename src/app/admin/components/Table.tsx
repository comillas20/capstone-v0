import { twMerge } from "tailwind-merge";
export default function Table({
	className,
	data,
	headers,
}: {
	className?: string;
	data: React.ReactNode[][];
	headers: string[];
}) {
	return (
		<div className={twMerge("overflow-y-auto", className)}>
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
							{entries.map((value, entryIndex) => (
								<td key={entryIndex}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
