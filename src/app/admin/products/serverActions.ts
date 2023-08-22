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
				imgUrl: "N/A",
				isAvailable: availability,
			},
			select: {
				name: true,
				description: true,
				isAvailable: true,
			},
		});
		return product;
	} else return null;
}

export async function getAllProducts() {
	const products = await prismadb.products.findMany();
	return products;
}

export async function getProduct(id: string) {
	const product = await prismadb.products.findUnique({
		where: {
			id: id,
		},
	});
	return product;
}
export async function deleteProducts(productID: string[]) {
	const products = await prismadb.products.deleteMany({
		where: {
			id: {
				in: productID,
			},
		},
	});

	return products.count;
}

export async function editProduct(event: FormData, productID: string) {
	const productName = event.get("productName")?.toString();
	const productDesc = event.get("productDesc")
		? event.get("productDesc")?.toString()
		: "N/A";
	//"on" is the default value an <input type="checkbox"/> gives when its checked and is submitted
	const availability = event.get("availability") === "on";
	if (productName && productDesc) {
		const product = await prismadb.products.update({
			data: {
				name: productName,
				description: productDesc,
				imgUrl: "N/A",
				isAvailable: availability,
			},
			where: {
				id: productID,
			},
			select: {
				name: true,
				description: true,
				isAvailable: true,
			},
		});
		return product;
	} else return null;
}
