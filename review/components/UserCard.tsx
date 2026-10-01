import type {User} from "@/lib/types";
import Link from 'next/link';

type UserCardProps = {
    user: User;
};

export default function UserCard({user}: UserCardProps){
    return(
        <Link href={`/login`} >
        <div key={user.id}
        className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md">                   
            <p className="font-semibold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
            </p>

            <p><span className="text-gray-400 font-medium">Age:</span> {user.age}</p>
            <p><span className="text-gray-400 font-medium">Gender:</span> {user.gender}</p>
        </div>
        </Link>
    )
}