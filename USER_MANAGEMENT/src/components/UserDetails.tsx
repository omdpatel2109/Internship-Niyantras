import UserFilter from './UserFilter';
import UserList from './UserList';

export default function UserDetails() {
    return(
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <header>
                    <div className="flex items-center justify-between p-4 bg-gray-100">
                        <h1 className="text-2xl font-bold mt-[5px] ml-[10px]">
                            Users
                        </h1>
                    </div>
                </header>

                <section>
                    <UserFilter/>
                </section>

                <section>
                    <UserList />
                </section>
            
            </div>
        </>
    )
}