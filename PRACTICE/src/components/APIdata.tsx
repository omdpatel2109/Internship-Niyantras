import { useState } from "react";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export default function APIdata() {

    const [users, setUsers] = useState<User[]>([]);

    async function fetchData() {
        try {
            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();
            setUsers(data.users);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center mt-[20px]">
                <button
                    onClick={fetchData}
                    className="flex items-center rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Call API Data
                </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
                {users.map((user) => (
                    <div key={user.id} 
                    className="mx-auto mb-3 rounded-md border p-4 w-[300px]">
                        <h2 className="font-bold">
                            {user.firstName} {user.lastName}
                        </h2>

                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </>
    );
}