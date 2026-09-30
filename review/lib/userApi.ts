"use server";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
};

export async function getUsers(): Promise<User[]> {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    return data.users;
}