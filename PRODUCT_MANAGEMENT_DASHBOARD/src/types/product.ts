export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    rating: number;
    thumbnail: string;
}

export interface ProductFormData {
    title: string;
    category: string;
    price: number;
    stock: number;
    description: string;
}