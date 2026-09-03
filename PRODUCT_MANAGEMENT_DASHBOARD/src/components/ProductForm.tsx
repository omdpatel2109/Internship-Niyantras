import {useEffect, useState, type FormEvent} from "react";
import { useProductContext } from "../context/ProductContext";

import type {Product, ProductFormData} from "../types/product";

interface ProductFormProps {
    product: Product | null;
    onClose: () => void;
    onSuccess: (message: string) => void;
}

interface FormErrors {
    title?: string;
    category?: string;
    price?: string;
    stock?: string;
    description?: string;
}

const emptyForm: ProductFormData = {
    title: "",
    category: "",
    price: 0,
    stock: 0,
    description: ""
};

export default function ProductForm({
    product, onClose, onSuccess
}: ProductFormProps) {
    const {addProduct, updateProduct, actionLoading} = useProductContext();

    const [form, setForm] = useState<ProductFormData>(emptyForm);

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (product) {
            setForm({
                title: product.title,
                category: product.category,
                price: product.price,
                stock: product.stock,
                description: product.description
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [product]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "Product name is required.";
        }

        if (!form.category.trim()) {
            newErrors.category = "Category is required.";
        }

        if (form.price <= 0) {
            newErrors.price = "Price must be greater than 0.";
        }

        if (form.stock < 0 || !Number.isInteger(form.stock)) {
            newErrors.stock = "Stock must be a valid integer.";
        }

        if (form.description.length > 200) {
            newErrors.description = "Description cannot exceed 200 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const productData: ProductFormData = {
            title: form.title.trim(),
            category: form.category.trim(),
            price: form.price,
            stock: form.stock,
            description: form.description.trim()
        };

        let success = false;

        if (product) {
            success = await updateProduct(product.id, productData);
        } else {
            success = await addProduct(productData);
        }

        if (success) {
            onSuccess(
                product
                    ? "Product updated successfully!"
                    : "Product added successfully!"
            );

            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
                    {product
                        ? "Edit Product"
                        : "Add Product"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Product Name  */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Product Name 
                        </label>

                        <input
                            type="text"
                            value={form.title}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    title: event.target.value
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Category 
                        </label>

                        <input
                            type="text"
                            value={form.category}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    category:
                                        event.target.value
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />

                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Price 
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={form.price}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    price: Number(
                                        event.target.value
                                    )
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />

                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Stock 
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={form.stock}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    stock: Number(
                                        event.target.value
                                    )
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />

                        {errors.stock && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.stock}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Description
                        </label>

                        <textarea
                            value={form.description}
                            maxLength={200}
                            rows={3}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    description:
                                        event.target.value
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />

                        <div className="text-right text-sm text-gray-500">
                            {form.description.length}/200
                        </div>

                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={actionLoading}
                            className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={actionLoading}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {actionLoading
                                ? "Saving..."
                                : product
                                  ? "Update"
                                  : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}