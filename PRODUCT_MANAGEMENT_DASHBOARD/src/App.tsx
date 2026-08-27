import {useEffect, useMemo, useState} from "react";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

import { useProductContext } from "./context/ProductContext";

import type { Product } from "./types/product";

function App() {
    const {products, loading} = useProductContext();
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");

    const PRODUCTS_PER_PAGE = 10;

    const categories = useMemo(() => {
        return Array.from(
            new Set(
                products.map(
                    (product) =>
                        product.category
                )
            )
        );
    }, [products]);

    const filteredCount = useMemo(() => {
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
        return result.length;
    }, [products, search, category]);

    const totalPages = Math.max(1,Math.ceil(filteredCount / PRODUCTS_PER_PAGE));

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, sort]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const showSuccessMessage = (message: string): void => {
        setSuccess(message);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                    <p className="text-xl font-semibold text-gray-700 dark:text-white">
                        Loading products...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 p-4 sm:p-6 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                            Product Management Dashboard
                        </h1>
                    </div>

                    <button
                        onClick={() => {
                            // setSelectedProduct(null);
                            setShowForm(true);
                        }}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                        + Add Product
                    </button>
                </div>

                {/* Success */}
                {success && (
                    <div className="mb-5 rounded-lg bg-green-100 p-4 text-green-700">
                        {success}
                    </div>
                )}

                {/* Search / Filter / Sort */}
                <div className="mb-5 grid gap-4 rounded-xl bg-white p-5 shadow md:grid-cols-3 dark:bg-gray-800">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"/>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="rounded-lg border border-gray-300 p-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map(
                            (item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        )}
                    </select>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target.value
                            )
                        }
                        className="rounded-lg border border-gray-300 p-2 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">
                            Sort Products
                        </option>

                        <option value="price-asc">
                            Price: Low → High
                        </option>

                        <option value="price-desc">
                            Price: High → Low
                        </option>

                        <option value="stock-asc">
                            Stock: Low → High
                        </option>

                        <option value="stock-desc">
                            Stock: High → Low
                        </option>
                    </select>
                </div>

                {/* Product List */}
                <ProductList
                    search={search}
                    category={category}
                    sort={sort}
                    currentPage={currentPage}
                    productsPerPage={PRODUCTS_PER_PAGE}
                    onEdit={(product) => {
                        setSelectedProduct(product);
                        setShowForm(true);
                    }}
                    onSuccess={showSuccessMessage}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-5">
                        <button onClick={() => setCurrentPage((page) =>
                                        page - 1
                                )
                            }
                            disabled={currentPage === 1}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-xl text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
                            &lt;
                        </button>

                        <span className="font-medium text-gray-700 dark:text-white">
                            Page{" "}
                            {currentPage} of{" "}
                            {totalPages}
                        </span>

                        <button
                            onClick={() =>
                                setCurrentPage((page) => page + 1
                                )
                            }
                            disabled={currentPage ===totalPages}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-xl text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
                            &gt;
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <ProductForm
                    product={selectedProduct}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedProduct(null);
                    }}
                    onSuccess={showSuccessMessage}
                />
            )}
        </main>
    );
}

export default App;