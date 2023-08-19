import EditableText from "@components/EditableText";
import Image from "next/image";
import prismadb from "../../../../../lib/prismadb";
type ProductProps = {
	params: { id: string };
};
export async function generateMetadata({ params }: ProductProps) {
	const product = await prismadb.products.findUnique({
		where: {
			id: params.id,
		},
	});
	return {
		title: product
			? product.name.concat(" | Jakelou")
			: "Product Not Found".concat(" | Jakelou"),
	};
}

export default async function Product({ params }: ProductProps) {
	const product = await prismadb.products.findUnique({
		where: {
			id: params.id,
		},
	});
	return (
		<>
			<div>
				<Image
					className="float-left mr-4"
					src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_5.jpg"
					alt="buko_pandan"
					width="600"
					height="600"></Image>
				<EditableText tag="h2" initialText={product ? product.name : "N/A"} />
				<EditableText tag="p" initialText={product ? product.description : "N/A"} />
			</div>
		</>
	);
}
