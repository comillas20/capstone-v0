type HeaderProps = {
	name: string;
	children: React.ReactNode;
};
export default function Header({ name, children }: HeaderProps) {
	return (
		<div className="flex justify-between flex-wrap md:flex-nowrap items-center pb-2 mb-3 border-b">
			<h1 className="pb-2">{name}</h1>
			<div className="flex flex-wrap justify-start mb-2 md:mb-0 gap-x-4 ">
				{children}
			</div>
		</div>
	);
}
