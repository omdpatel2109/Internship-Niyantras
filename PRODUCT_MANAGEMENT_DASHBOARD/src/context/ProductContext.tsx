import {createContext,useContext,type ReactNode} from "react";
import { useProducts } from "../hooks/useProducts";
import type {Product, ProductFormData} from "../types/product";

interface ProductContextType {
    products: Product[];
    loading: boolean;
    actionLoading: boolean;
    error: string;

    addProduct: (product: ProductFormData) => Promise<boolean>;
    updateProduct: (id: number, product: ProductFormData) => Promise<boolean>;
    deleteProduct: (id: number) => Promise<boolean>;
    fetchProducts: () => Promise<void>;
}

const ProductContext =
    createContext<ProductContextType | undefined>(
        undefined
    );

interface ProductProviderProps {
    children: ReactNode;
}

export function ProductProvider({
    children
}: ProductProviderProps) {
    const productData = useProducts();

    return (
        <ProductContext.Provider value={productData}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext(): ProductContextType {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error(
            "useProductContext must be used inside ProductProvider"
        );
    }

    return context;
}