import { useMemo, useState } from "react";

import { useProductContext } from "../context/ProductContext";

import type { Product } from "../types/product";

interface ProductListProps {
    search: string;
    category: string;
    sort: string;
    currentPage: number;
    productsPerPage: number;
    onEdit: (product: Product) => void;
    onSuccess: (message: string) => void;
}

export default function ProductList({
    search,
    category,
    sort,
    currentPage,
    productsPerPage,
    onEdit,
    onSuccess
}: ProductListProps) {
    const {products, deleteProduct, actionLoading} = useProductContext();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            result = result.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (category) {
            result = result.filter(
                (product) =>
                    product.category === category
            );
        }

        if (sort === "price-asc") {
            result.sort(
                (a, b) => a.price - b.price
            );
        }

        if (sort === "price-desc") {
            result.sort(
                (a, b) => b.price - a.price
            );
        }

        if (sort === "stock-asc") {
            result.sort(
                (a, b) => a.stock - b.stock
            );
        }

        if (sort === "stock-desc") {
            result.sort(
                (a, b) => b.stock - a.stock
            );
        }

        return result;
    }, [products, search,category,sort]);

    const startIndex = (currentPage - 1) * productsPerPage;

    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const handleDelete = async (
        product: Product
    ): Promise<void> => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.title}"?`
        );

        if (!confirmed) {
            return;
        }
        setDeletingId(product.id);

        const success = await deleteProduct(product.id);

        setDeletingId(null);

        if (success) {
            onSuccess(
                "Product deleted successfully!"
            );
        }
    };

    if (currentProducts.length === 0) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow dark:bg-gray-800">
                <p className="text-lg text-gray-500 dark:text-gray-300">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl bg-white shadow dark:bg-gray-800">
            <table className="min-w-full">
                <thead className="bg-gray-300 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left">
                            Product
                        </th>

                        <th className="px-4 py-3 text-left">
                            Category
                        </th>

                        <th className="px-4 py-3 text-left">
                            Price
                        </th>

                        <th className="px-4 py-3 text-left">
                            Stock
                        </th>

                        <th className="px-4 py-3 text-left">
                            Rating
                        </th>

                        <th className="px-4 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentProducts.map(
                        (product) => (
                            <tr
                                key={product.id}
                                className="border-t border-gray-200 dark:border-gray-700"
                            >
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="h-12 w-12 rounded object-cover"
                                        />

                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {product.title}
                                            </p>

                                            <p className="max-w-xs truncate text-sm text-gray-500">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-4 capitalize">
                                    {product.category}
                                </td>

                                <td className="px-4 py-4">
                                    ${product.price}
                                </td>

                                <td className="px-4 py-4">
                                    {product.stock}
                                </td>

                                <td className="px-4 py-4">
                                    {product.rating}
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                onEdit(product)
                                            }
                                            disabled={ actionLoading}
                                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(product)
                                            }
                                            disabled={deletingId === product.id}
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
                                        >
                                            {deletingId ===
                                            product.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}