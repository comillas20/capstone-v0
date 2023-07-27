import Navigation from "./components/Navigation";

export async function generateMetadata() {
	return {
		title: "Jakelou - Admin",
		description: "Admin dashboard for management",
	};
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid h-screen grid-cols-12">
			<Navigation></Navigation>
			<main className="col-span-12 bg-white p-4 md:col-span-9 lg:col-span-10">
				{children}
			</main>
		</div>
	);
}
