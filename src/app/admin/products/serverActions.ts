"use server";
import prismadb from "../../../../lib/prismadb";
export async function createNewProduct(event: FormData) {
	const productName = event.get("productName")?.toString();
	const productDesc = event.get("productDesc")?.toString();
	const categoryName = event.get("categoryName")?.toString();
	//"on" is the default value an <input type="checkbox"/> gives when its checked and is submitted
	const availability = event.get("availability") === "on";
	if (productName && categoryName) {
		const product = await prismadb.products.create({
			data: {
				name: productName,
				description: productDesc,
				isAvailable: availability,
				imgUrl: "N/A",
				category: {
					connectOrCreate: {
						where: { name: categoryName },
						create: { name: categoryName },
					},
				},
			},
			include: {
				category: true,
			},
		});
		return product;
	} else return null;
}

export async function getAllProducts() {
	const products = await prismadb.products.findMany({
		include: {
			category: true,
		},
	});
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
	const productDesc = event.get("productDesc")?.toString();
	//"on" is the default value an <input type="checkbox"/> gives when its checked and is submitted
	const availability = event.get("availability") === "on";
	if (productName) {
		const product = await prismadb.products.update({
			data: {
				name: productName,
				description: productDesc,
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

export async function getAllCategories() {
	const categories = await prismadb.menuCategories.findMany();
	return categories;
}

export async function getCategory(categoryName: string) {
	const category = await prismadb.menuCategories.findUnique({
		where: {
			name: categoryName,
		},
		include: {
			product: true,
		},
	});
	return category;
}

export async function deleteCategory(categoryName: string) {
	const category = await prismadb.menuCategories.delete({
		where: { name: categoryName },
	});
	return category;
}
