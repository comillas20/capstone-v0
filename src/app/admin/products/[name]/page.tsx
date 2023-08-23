import EditableText from "@components/EditableText";
import Image from "next/image";
import prismadb from "../../../../../lib/prismadb";
import { getAllProducts } from "../serverActions";
type ProductProps = {
	params: { name: string };
};
export async function generateMetadata({ params }: ProductProps) {
	const product = await prismadb.products.findUnique({
		where: {
			name: params.name,
		},
	});
	return {
		title: product
			? product.name.concat(" | Jakelou")
			: "Product Not Found".concat(" | Jakelou"),
	};
}

export async function generateStaticParams() {
	const products = await getAllProducts();
	return products.map(product => ({
		name: product.name,
	}));
}

export default async function Product({ params }: ProductProps) {
	const product = await prismadb.products.findUnique({
		where: {
			name: params.name,
		},
	});
	return (
		<>
			<div>
				<Image
					className="float-left mr-4 h-auto w-auto"
					src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_5.jpg"
					alt="buko_pandan"
					width="600"
					height="600"
					priority></Image>
				<EditableText tag="h2" initialText={product ? product.name : "N/A"} />
				<EditableText tag="p" initialText={product ? product.description : "N/A"} />
			</div>
		</>
	);
}
