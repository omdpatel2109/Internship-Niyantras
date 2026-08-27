import axios from "axios";
import type {Product, ProductFormData, ProductsResponse} from "../types/product";

const API = axios.create({
    baseURL: "https://dummyjson.com"
});

export const getProducts = async (): Promise<Product[]> => {
    const response = await API.get<ProductsResponse>("/products");
    return response.data.products;
};

export const addProduct = async(product: ProductFormData): Promise<Product> => {
    const response = await API.post<Product>("/products/add",product);
    return response.data;
};

export const updateProduct = async (id: number,product: ProductFormData): Promise<Product> => {
    const response = await API.put<Product>(
        `/products/${id}`,
        product
    );

    return response.data;
};

export const deleteProduct = async (
    id: number
): Promise<Product> => {
    const response = await API.delete<Product>(
        `/products/${id}`
    );

    return response.data;
};