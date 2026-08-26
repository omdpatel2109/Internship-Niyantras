import { useEffect, useState, type FormEvent } from "react";
import type { Product, ProductFormData } from "../types/product";

interface ProductFormProps {
    product?: Product | null;
    loading: boolean;
    onSubmit: (data: ProductFormData) => void;
    onClose: () => void;
}

const initialForm: ProductFormData = {
    title: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
};

export default function ProductForm({
    product,
    loading,
    onSubmit,
    onClose,
}: ProductFormProps) {
    const [form, setForm] = useState<ProductFormData>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (product) {
        setForm({
            title: product.title,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
        });
        } else {
        setForm(initialForm);
    }

        setErrors({});
    }, [product]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!form.title.trim()) {
            newErrors.title = "Product name is required.";
        } else if (form.title.trim().length < 3) {
            newErrors.title = "Product name must be at least 3 characters.";
        }

        if (!form.category.trim()) {
            newErrors.category = "Category is required.";
        }

        if (!form.price || form.price <= 0) {
            newErrors.price = "Price must be greater than 0.";
        }

        if (
            form.stock === undefined ||
            form.stock === null ||
            form.stock < 0 ||
            !Number.isInteger(form.stock)
        ) {
            newErrors.stock = "Stock must be a non-negative integer.";
        }

        if (form.description.length > 200) {
            newErrors.description ="Description must not exceed 200 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit({
            ...form,
            title: form.title.trim(),
            category: form.category.trim(),
            description: form.description.trim(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product ? "Edit Product" : "Add Product"}
                    </h2>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                        Product Name *
                        </label>

                        <input
                        type="text"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter product name"
                        />

                        {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                {/* Category */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                        Category *
                        </label>

                        <input
                        type="text"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter category"
                        />

                        {errors.category && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.category}
                        </p>
                        )}
                    </div>

                {/* Price */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                        Price *
                        </label>

                        <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={(e) =>
                            setForm({
                            ...form,
                            price: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter price"
                        />

                        {errors.price && (
                        <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                        )}
                    </div>

                {/* Stock */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                        Stock *
                        </label>

                        <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.stock}
                        onChange={(e) =>
                            setForm({
                            ...form,
                            stock: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter stock"
                        />

                        {errors.stock && (
                        <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                        )}
                    </div>

                {/* Description */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                        Description
                        </label>

                        <textarea
                        value={form.description}
                        maxLength={200}
                        onChange={(e) =>
                            setForm({
                            ...form,
                            description: e.target.value,
                            })
                        }
                        rows={3}
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter description"
                        />

                        <div className="mt-1 flex justify-between">
                        {errors.description ? (
                            <p className="text-sm text-red-500">
                            {errors.description}
                            </p>
                        ) : (
                            <span />
                        )}

                        <span className="text-sm text-gray-500">
                            {form.description.length}/200
                        </span>
                        </div>
                    </div>

                {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                        Cancel
                        </button>

                        <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                        {loading
                            ? product
                            ? "Updating..."
                            : "Adding..."
                            : product
                            ? "Update Product"
                            : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}