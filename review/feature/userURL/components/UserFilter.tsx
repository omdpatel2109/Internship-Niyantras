"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getUsers, User } from "@/lib/userApi";

export default function UserFilters(){
    const router = useRouter();
    const searchParams = useSearchParams();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const search = searchParams.get("search") || "";
    const age = searchParams.get("age") || "";
    const gender = searchParams.get("gender") || "";

    // First render: get all users
    useEffect(() =>{
        async function loadUsers(){
            try{
                const data = await getUsers();
                setUsers(data);
            }catch(error){
                alert(`Failed to fetch users ${error}`);
            }finally{
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    function updateFilter(key: string, value: string){
        const params = new URLSearchParams(searchParams.toString());

        if(value){
            params.set(key, value);
        }else{
            params.delete(key);
        }
        router.push(`/userUrl?${params.toString()}`);
    }

    // Filter already fetched users
    const filteredUsers = users.filter((user) =>{
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(search.toLowerCase());
        const matchesage = !age || user.age >= Number(age);
        const matchesGender = !gender || user.gender.toLowerCase() === gender.toLowerCase();

        return(
            matchesSearch &&
            matchesage &&
            matchesGender
        );
    });

    if(loading){
        // Fixed syntax bug from original component while preserving design intent
        return (
            <div className="flex h-48 justify-center items-center">
                <p className="text-sm font-medium text-gray-500">Loading users...</p>
            </div>
        );
    }

    return(
        <div className="w-full mx-auto p-6 max-w-7xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 p-5 rounded-xl bg-gray-100 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Search</label>
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={search}
                        onChange={(e) =>updateFilter("search", e.target.value)}
                        className="border border-gray-300 p-2.5 rounded-lg w-full text-sm text-gray-900 placeholder-gray-400 
                        bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Minimum age</label>
                    <input
                        type="number"
                        placeholder="Minimum age"
                        value={age}
                        onChange={(e) =>
                        updateFilter("age", e.target.value)
                        }
                        className="border border-gray-300 p-2.5 rounded-lg w-full text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                    <select 
                        className="border border-gray-300 p-2.5 rounded-lg w-full text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
                        value={gender}
                        onChange={(e) => updateFilter("gender", e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <p className="text-sm font-medium text-gray-500 mb-4 pl-1">
                Showing <span className="font-semibold text-gray-800">{filteredUsers.length}</span> of <span className="font-semibold text-gray-800">{users.length}</span> users
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.id}
                        className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md">
                        <p className="font-semibold text-gray-900 mb-2">
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
