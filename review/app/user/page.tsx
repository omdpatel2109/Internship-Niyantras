"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers} from "@/lib/userApi";
import UsersCard from "@/components/UserCard";

export default function UsersPage() {
    const [search, setSearch] = useState("");

    const [visibleUsers, setVisibleUsers] = useState(10);

    const {data: users = [], isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    useEffect(() => {
        const savedSearch = sessionStorage.getItem("userSearch");
        if(savedSearch){
            setSearch(savedSearch);
        }
    }, []);

    function handleSearch(value: string) {
        setSearch(value);
        sessionStorage.setItem("userSearch", value);
        // setCurrentPage(1);
    }

    const filteredUsers = users.filter((user) => {
        const name =
        `${user.firstName} ${user.lastName}`.toLowerCase();

        return name.includes(search.toLowerCase());
    });

    const visibleUser = filteredUsers.slice(0, visibleUsers);

    if (isLoading) {
        return (
            <div className="flex h-48 justify-center items-center">
                <p className="text-sm font-medium text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Users List</h1>
            
            <div className="flex items-center mb-6 max-w-md">
                <span className="flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm font-medium text-gray-600 h-10">
                    Search User
                </span>
                <input
                    type="text"
                    value={search}
                    placeholder="Search by name..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="flex-1 block w-full px-4 rounded-r-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 h-10"
                />
            </div>

            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {visibleUser.map((user) => (
                        <UsersCard key={user.id} user={user} />
                    ))}
                </div>
                    {visibleUser.length < filteredUsers.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setVisibleUsers((prev) => prev + 10)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
}
