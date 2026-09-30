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
        <div className="block flex justify-center items-center">
            return <p>Loading users...</p>;
        </div>
    }

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-2 border border-b 
            rounded-md bg-gray-500">Users</h1>

            <div className="grid grid-cols-3 gap-20 border p-2 bg-gray-100">
                <div>
                    <label className="mr-2">Search</label>
                    <input
                        type="text"
                        placeholder="Search user"
                        value={search}
                        onChange={(e) =>
                        updateFilter("search", e.target.value)
                        }
                        className="border p-2 rounded w-full mb-3"
                    />
                </div>

                <div>
                    <label className="mr-2">Minimum age</label>
                    <input
                        type="number"
                        placeholder="Minimum age"
                        value={age}
                        onChange={(e) =>
                        updateFilter("age", e.target.value)
                        }
                        className="border p-2 rounded w-full mb-3"
                    />
                </div>

                <div>
                    <label className="mr-2">gender</label>
                    <select className="border p-2 rounded w-full mb-3 h-10.5" value={gender}
                    onChange={(e) => updateFilter("gender", e.target.value)}>
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
            </div>

            <p className="mb-2 mt-2">
                Showing {filteredUsers.length} of {users.length} users
            </p>
            
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