import type {User} from "@/lib/types";

export default function page(user: User) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <p>Hello {user.firstName}</p>
        </div>
    );
}