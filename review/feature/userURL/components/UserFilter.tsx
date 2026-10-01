"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getUsers } from "@/lib/userApi";
import type { User } from "@/lib/types";
import UserCard from "@/components/UserCard";

export default function UserFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const search = searchParams.get("search") || "";
    const age = searchParams.get("age") || "";
    const gender = searchParams.get("gender") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        async function loadUsers() {
            try{
                const data = await getUsers();
                setUsers(data);
            }catch (error){
                alert(`Failed to fetch users ${error}`);
            }finally{
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    // Update URL filters
    function updateFilter(key: string, value: string){
        const params = new URLSearchParams(searchParams.toString());

        if(value){
            params.set(key, value);
        }else{
            params.delete(key);
        }

        // Reset pagination when filter changes
        setCurrentPage(1);
        router.push(`/userUrl?${params.toString()}`);
    }

    // Filter already fetched users
    const filteredUsers = users.filter((user) =>{
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(search.toLowerCase());
        const matchesAge = !age || user.age >= Number(age);
        const matchesGender = !gender || user.gender.toLowerCase() === gender.toLowerCase();
        return(
            matchesSearch &&
            matchesAge &&
            matchesGender
        );
    });

    // Pagination AFTER filtering
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    if(loading){
        return (
            <div className="flex h-48 justify-center items-center">
                <p className="text-sm font-medium text-gray-500">
                    Loading users...
                </p>
            </div>
        );
    }

    return(
        <div className="w-full mx-auto p-6 max-w-7xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6"> Users </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border 
            border-gray-200 p-5 rounded-xl bg-gray-100 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Search</label>

                    <input
                        type="text"
                        placeholder="Search user..."
                        value={search}
                        onChange={(e) => updateFilter("search",e.target.value)}
                        className="border border-gray-300 p-2.5 rounded-lg w-full text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Minimum age</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Minimum age"
                        value={age}
                        onChange={(e) =>updateFilter("age",e.target.value)}
                        className="border border-gray-300 p-2.5 rounded-lg w-full text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                    <select
                        className="border border-gray-300 p-2.5 rounded-lg w-full text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={gender}
                        onChange={(e) =>updateFilter("gender",e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <p className="text-sm font-medium text-gray-500 mb-4 pl-1">Showing{" "}
                <span className="font-semibold text-gray-800">{filteredUsers.length}</span>
                {" "} of { " "}
                <span className="font-semibold text-gray-800">{users.length}</span>{" "}
                users
            </p>

            {paginatedUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {paginatedUsers.map((user) => (
                        <UserCard key={user.id} user={user}/>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10">No users found.</p>
            )}

            {filteredUsers.length > 0 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:bg-white disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span> Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:bg-white disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}