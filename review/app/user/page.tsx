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
        return <p>Loading...</p>;
    }

    return (
        <div className=" mx-auto border rounded-md border-gray-300 p-2 w-full">
            <h1 className="text-2xl font-bold text-center mb-2 border border-b rounded-md bg-gray-500">Users List</h1>
            <div className="flex justify h-full mb-1 w-full h-10">
                <label className="p-2 mt-2 px-4 mb-1 bg-gray-300 border-t border-l border-b border-gray-600">Search User</label>
                <input
                    type="text"
                    value={search}
                    placeholder="Search user"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="p-2 mt-2 px-4 mb-1 border border-gray-600 flex items-center"
                />
            </div>

            <div className="grid grid-cols-5 gap-3">
                {filteredUsers.map((user) => (
                    <div key={user.id}
                        className="border p-3 mb-2 rounded">
                        <p className="font-semibold">
                            {user.firstName} {user.lastName}
                        </p>

                        <p>Age: {user.age}</p>
                        <p>Gender: {user.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}