import type { Product } from "../types/product";

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export default function ProductList({
    products,
    onEdit,
    onDelete,
}: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-10 text-center shadow dark:bg-gray-900">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                No products found.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                Try changing your search or category filter.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow dark:bg-gray-900">
            <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                        <th className="px-5 py-4 text-left">Product</th>
                        <th className="px-5 py-4 text-left">Category</th>
                        <th className="px-5 py-4 text-left">Price</th>
                        <th className="px-5 py-4 text-left">Stock</th>
                        <th className="px-5 py-4 text-left">Rating</th>
                        <th className="px-5 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                        <tr
                            key={product.id}
                            className="border-t border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <td className="px-5 py-4">
                            <div className="flex items-center gap-4">
                                <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-14 w-14 rounded-lg object-cover"
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

                            <td className="px-5 py-4 capitalize text-gray-600 dark:text-gray-300">
                            {product.category}
                            </td>

                            <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">
                            ${product.price.toFixed(2)}
                            </td>

                            <td className="px-5 py-4">
                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${
                                product.stock > 10
                                    ? "bg-green-100 text-green-700"
                                    : product.stock > 0
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                            >
                                {product.stock}
                            </span>
                            </td>

                            <td className="px-5 py-4">
                            {product.rating.toFixed(1)}
                            </td>

                            <td className="px-5 py-4">
                            <div className="flex justify-center gap-2">
                                <button
                                onClick={() => onEdit(product)}
                                className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                                >
                                Edit
                                </button>

                                <button
                                onClick={() => onDelete(product)}
                                className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                                >
                                Delete
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
}