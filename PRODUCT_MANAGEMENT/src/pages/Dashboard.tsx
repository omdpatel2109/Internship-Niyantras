import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import type {Product} from '../type/Product';

export default function Dashboard() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchProducts() {
        const access_token = localStorage.getItem("access_token");

        console.log("access_token:", access_token);

        if(!access_token) {
            navigate("/login");
            return;
        }

        if(access_token){
            navigate("/dashboard");
        }

        try{
            setLoading(true);
            setError("");

            console.log("Fetching products...");

            const response = await api.get("/auth/products", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            console.log("PRODUCT API RESPONSE:", response);
            console.log("PRODUCT DATA:", response.data);

            setProducts(response.data);
        }catch (error: any) {
            console.error("PRODUCT ERROR:", error);

            if(error.response?.status === 401) {
                localStorage.removeItem("access_token");
                navigate("/login");
                return;
            }

            setError(
            error.response?.data?.message ||
                "Unable to load products."
            );
        }finally {
            setLoading(false);
            }
        }
        useEffect(() => {
            fetchProducts();
        }, [])

    const filteredProducts = products.filter((product) =>
        (product.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

    return (
        <main className="min-h-screen bg-gray-100">
            <Header />

                <section className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-400 px-6 py-16 text-center text-white">
                    <h1 className="text-4xl font-bold md:text-5xl">
                    Discover the Latest Technology
                    </h1>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-white">
                    Explore our latest collection of smartphones and
                    laptops from top brands like Apple, Samsung,
                    Huawei, and more. Whether you're looking for
                    cutting-edge technology or sleek design, we have
                    something for everyone. Shop now and experience
                    the future today!
                    </p>
                </section>

            <section className="mx-auto max-w-7xl px-6 py-10">
            
                    <div className="flex justify-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                        Our Products
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <p className="mt-1 text-gray-500">
                        Explore our latest collection
                        </p>
                    </div>

                    <div className="flex justify-center mt-[15px] mb-[20px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-[500px] rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 md:w-80"
                        />
                    </div>
                

                {loading && (
                <div className="py-20 text-center">
                    <p className="text-lg text-gray-500">
                    Loading products...
                    </p>
                </div>
                )}

                {!loading && error && (
                <div className="rounded-lg bg-red-100 p-5 text-center text-red-700">
                    {error}
                </div>
                )}

                {!loading && !error &&
                filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                    <h3 className="text-xl font-semibold text-gray-700">
                        No products found
                    </h3>

                    <p className="mt-2 text-gray-500">
                        Try searching for another product.
                    </p>
                    </div>
                )}

                {!loading &&
                !error &&
                filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                        key={product.id}
                        product={product}
                        />
                    ))}
                    </div>
                )}
            </section>
        </main>
    );
}