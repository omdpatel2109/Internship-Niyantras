import { useEffect, useMemo, useState } from "react";

import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import ConfirmDialog from "../components/ConfirmDialog";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

import {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../services/productService";

import type { Product, ProductFormData } from "../types/product";

export default function ProductManagement() {
    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [deleteProductItem, setDeleteProductItem] =
        useState<Product | null>(null);

    const PRODUCTS_PER_PAGE = 10;


    const fetchProducts = async () => {
        try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
        } catch {
            setError(
                "Unable to load products. Please check your internet connection and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const categories = useMemo(() => {
        return Array.from(new Set(products.map((product) => product.category))).sort();
    }, [products]);


    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
        result = result.filter((product) =>
            product.title
            .toLowerCase()
            .includes(search.toLowerCase().trim())
        );
        }

        if (category) {
        result = result.filter(
            (product) => product.category === category
        );
        }

        switch (sort) {
        case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;

        case "stock-asc":
            result.sort((a, b) => a.stock - b.stock);
            break;

        case "stock-desc":
            result.sort((a, b) => b.stock - a.stock);
            break;

        default:
            break;
        }

        return result;
    }, [products, search, category, sort]);

    const totalPages = Math.ceil(
        filteredProducts.length / PRODUCTS_PER_PAGE
    );

    const paginatedProducts = useMemo(() => {
        const startIndex =
        (currentPage - 1) * PRODUCTS_PER_PAGE;

        return filteredProducts.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, sort]);


    const handleFormSubmit = async (data: ProductFormData) => {
        try {
            setActionLoading(true);
            setError("");
            setMessage("");

            if (selectedProduct) {
                const updatedProduct = await updateProduct(
                selectedProduct.id,
                data
                );

                setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === selectedProduct.id
                    ? {
                        ...product,
                        ...updatedProduct,
                        }
                    : product
                )
                );

                setMessage("Product updated successfully.");
            } else {
                const newProduct = await addProduct(data);

                setProducts((currentProducts) => [
                newProduct,
                ...currentProducts,
            ]);

            setMessage("Product added successfully.");
        }

            setIsFormOpen(false);
            setSelectedProduct(null);
        } catch {
        setError(
            selectedProduct
            ? "Unable to update product. Please try again."
            : "Unable to add product. Please try again."
        );
        } finally {
        setActionLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
        setMessage("");
        setError("");
    };


    const handleDelete = async () => {
        if (!deleteProductItem) {
        return;
        }

        try {
            setActionLoading(true);
            setError("");
            setMessage("");

            await deleteProduct(deleteProductItem.id);

            setProducts((currentProducts) =>
                currentProducts.filter(
                (product) => product.id !== deleteProductItem.id
                )
            );

            setMessage("Product deleted successfully.");

            setDeleteProductItem(null);
        } catch {
            setError("Unable to delete product. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
        setMessage("");
        setError("");
    };

    const handleCloseForm = () => {
        if (actionLoading) {
        return;
        }

        setIsFormOpen(false);
        setSelectedProduct(null);
    };


    if (loading) {
        return (
            <main className="min-h-screen bg-gray-100 p-6 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                            Loading products...
                        </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Product Management
                        </h1>

                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage your products easily.
                        </p>
                    </div>

                    <button
                        // onClick={handleAddProduct}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
                    >
                        + Add Product
                    </button>
                </div>

                {message && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                    {message}
                </div>
                )}

                {error && (
                <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    <span>{error}</span>

                    <button
                    onClick={() => setError("")}
                    className="font-bold"
                    >
                    ×
                    </button>
                </div>
                )}

                <div className="mb-6 rounded-2xl bg-white p-5 shadow dark:bg-gray-900">
                <SearchFilter
                    search={search}
                    category={category}
                    sort={sort}
                    categories={categories}
                    onSearchChange={setSearch}
                    onCategoryChange={setCategory}
                    onSortChange={setSort}
                />
                </div>

                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Showing {paginatedProducts.length} of{" "}
                {filteredProducts.length} products
                </div>

                <ProductList
                products={paginatedProducts}
                onEdit={handleEdit}
                onDelete={setDeleteProductItem}
                />

                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                />
            </div>

            {isFormOpen && (
                <ProductForm
                product={selectedProduct}
                loading={actionLoading}
                onSubmit={handleFormSubmit}
                onClose={handleCloseForm}
                />
            )}

            {deleteProductItem && (
                <ConfirmDialog
                productName={deleteProductItem.title}
                loading={actionLoading}
                onConfirm={handleDelete}
                onCancel={() => {
                    if (!actionLoading) {
                    setDeleteProductItem(null);
                    }
                }}
                />
            )}
        </main>
  );
}