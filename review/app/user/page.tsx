"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
};

async function getUsers(): Promise<User[]> {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data.users;
}

export default function UsersPage() {
    const [search, setSearch] = useState("");

    const {data: users = [], isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    useEffect(() => {
        const savedSearch =
        sessionStorage.getItem("userSearch");

        if(savedSearch) {
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
        <div className="max-w-md mx-auto border rounded-md border-gray-300 p-6">
            <h1 className="text-2xl font-bold text-center mb-6 ">Users List</h1>

            <input
                type="text"
                value={search}
                placeholder="Search user"
                onChange={(e) => handleSearch(e.target.value)}
                className="py-2 px-4 mb-6 border rounded-md border-gray-600 flex items-center"
            />

            {filteredUsers.map((user) => (
                <div key={user.id}>
                    <li className="mb-1">{user.firstName} {user.lastName}</li>
                </div>
            ))}
        </div>
    );
}