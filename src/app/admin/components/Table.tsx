export default function Table({
	className,
	data,
	headers,
}: {
	className?: string;
	data: string[][];
	headers: string[];
}) {
	return (
		<table className={className}>
			<thead>
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
	);
}
