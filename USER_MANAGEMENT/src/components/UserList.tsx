import UserListRow from './UserListRow';
import useUser from '../hooks/useUser';
import type {User} from '../type/UserType';

interface Props {
    users: User[],
}

export default function UserList({users}: Props) {    
    return(
        <>
            <div className="border border-gray-300 p-4 bg-white rounded-2xl ml-[30px] mr-[30px] mt-[30px]">
                <table className="w-full border border-collapse rounded-xl">
                    <thead>
                        <tr>
                            <th className="border-b border-t border-l border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                                Photo
                            </th>
                            <th className="border-b border-t border-gray-400 p-[12px] text-left bg-gray-100 text-black"> 
                                Full Name
                            </th>
                            <th className="border-b border-t border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                                Age
                            </th>
                            <th className="border-b border-t border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                                Gender
                            </th>
                            <th className="border-b border-t border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                                Email
                            </th>
                            <th className="border-b border-t border-r border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                                Role
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) =>(
                            <UserListRow key={user.id} user={user} />
                        ) )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}