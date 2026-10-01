"use server";
import type {User} from "@/lib/types";

export async function getUsers(): Promise<User[]> {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    return data.users;
}