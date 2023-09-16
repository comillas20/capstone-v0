type HeaderProps = {
	name: string;
	children?: React.ReactNode;
};
export default function Header({ name, children }: HeaderProps) {
	return (
		<div className="mb-6 flex flex-wrap items-center justify-between border-b border-brand pb-2 md:flex-nowrap">
			<h2 className="pb-1">{name}</h2>
			{/* ONLY RENDER THE DIV FOR CHILDREN IF CHILDREN IS PROVIDED */}
			{children && (
				<div className="mb-2 flex flex-wrap justify-start gap-x-4 md:mb-0 ">
					{children}
				</div>
			)}
		</div>
	);
}
