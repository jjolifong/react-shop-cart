import { mockProducts } from "./mockProducts";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

function mapProduct(item) {
  return {
    id: item.id,
    name: item.title,
    price: item.price,
    image: item.image,
    category: item.category,
  };
}

export async function fetchProducts() {
  try {
    const response = await fetch(PRODUCTS_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return {
      products: data.map(mapProduct),
      isMock: false,
    };
  } catch {
    return {
      products: mockProducts,
      isMock: true,
    };
  }
}
