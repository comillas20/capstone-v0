"use server";
import { revalidatePath } from "next/cache";
import prismadb from "../../../../lib/prismadb";
export async function createNewProduct(event: FormData) {
	const productName = event.get("productName")?.toString();
	const productDesc = event.get("productDesc")
		? event.get("productDesc")?.toString()
		: "N/A";
	//"on" is the default value an <input type="checkbox"/> gives when its checked and is submitted
	const availability = event.get("availability") === "on";
	if (productName && productDesc) {
		const product = await prismadb.products.create({
			data: {
				name: productName,
				description: productDesc,
				img: "N/A",
				isAvailable: availability,
			},
		});
		revalidatePath("/products");
	}
}

export async function getAllProducts() {
	const products = await prismadb.products.findMany();
	return products;
}
