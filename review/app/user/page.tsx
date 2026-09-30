"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers, User } from "@/lib/userApi";

export default function UsersPage() {
    const [search, setSearch] = useState("");

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
    }

    const filteredUsers = users.filter((user) => {
        const name =
        `${user.firstName} ${user.lastName}`.toLowerCase();

        return name.includes(search.toLowerCase());
    });

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.id}
                        className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md ">
                        <p className="font-semibold text-base text-gray-900 mb-2">
                            {user.firstName} {user.lastName}
                        </p>

                        <p><span className="text-gray-400 font-medium">Age:</span> {user.age}</p>
                        <p><span className="text-gray-400 font-medium">Gender:</span> {user.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
