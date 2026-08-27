import { useEffect, useState } from "react";

import {getProducts,addProduct as addProductAPI,
    updateProduct as updateProductAPI,deleteProduct as deleteProductAPI
} from "../services/productService";

import type {Product, ProductFormData} from "../types/product";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoading, setActionLoading] =useState<boolean>(false);
    const [error, setError] = useState<string>("");
    
    const fetchProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            setError("");

            const data = await getProducts();

            setProducts(data);
        } catch {
            setError(
                "Failed to load products. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product: ProductFormData): Promise<boolean> => {
        try {
            setActionLoading(true);
            setError("");

            const newProduct = await addProductAPI(product);

            setProducts((previousProducts) => [
                newProduct,
                ...previousProducts
            ]);

            return true;
        } catch {
            setError(
                "Failed to add product. Please try again."
            );
            return false;
        } finally {
            setActionLoading(false);
        }
    };

    const updateProduct = async (id: number,product: ProductFormData): Promise<boolean> => {
        try {
            setActionLoading(true);
            setError("");

            const updatedProduct = await updateProductAPI(id, product);

            setProducts((previousProducts) =>
                previousProducts.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            ...updatedProduct
                        }
                        : item
                )
            );

            return true;
        } catch {
            setError(
                "Failed to update product. Please try again."
            );

            return false;
        } finally {
            setActionLoading(false);
        }
    };

    const deleteProduct = async (id: number): Promise<boolean> => {
        try {
            setActionLoading(true);
            setError("");   

            await deleteProductAPI(id);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (item) => item.id !== id
                )
            );

            return true;
        } catch {
            setError(
                "Failed to delete product. Please try again."
            );

            return false;
        } finally {
            setActionLoading(false);
        }
    };

    return {
        products,
        loading,
        actionLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts
    };
};