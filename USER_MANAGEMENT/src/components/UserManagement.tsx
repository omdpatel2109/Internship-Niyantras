import UserDetails from './UserDetails';
import { useUserContext } from "../context/UserContext";

export default function UserManagement() {
    const { searchingUser, searchUser } = useUserContext();
    return(
        <>
            <header>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
                    <h1 className="text-3xl font-bold mt-[5px] ml-[10px] dark:text-gray-400">
                        User Management
                    </h1>
                    <input 
                        type="text"
                        value={searchingUser}
                        placeholder="Search users..."
                        className="text-left border border-gray-300 rounded mt-[5px] mr-[200px] py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[40%]"
                        onChange={(e) => searchUser(e.target.value)}
                    />
                </div>
            </header>

            <section>
                <UserDetails/>
            </section>
        </>
    )
}