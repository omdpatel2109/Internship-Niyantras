import UserFilter from './UserFilter';
import UserList from './UserList';
import type { User } from '../type/UserType';

interface Props {
    users: User[];
    reset: () => void;
    applyFilters: () => void;
    gender: string;
    setGender: (v: string) => void;
    role: string;
    setRole: (v: string) => void;
    bloodGroup: string;
    setBloodGroup: (v: string) => void;
    ageRange: string;
    setAgeRange: (v: string) => void;
}

export default function UserDetails({ users, reset, applyFilters, gender, setGender, role, setRole, bloodGroup, setBloodGroup, ageRange, setAgeRange }: Props) {
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
                    <UserFilter users={users} reset={reset} applyFilters={applyFilters}
                        gender={gender} setGender={setGender}
                        role={role} setRole={setRole}
                        bloodGroup={bloodGroup} setBloodGroup={setBloodGroup}
                        ageRange={ageRange} setAgeRange={setAgeRange}
                    />
                </section>

                <section>
                    <UserList users={users} />
                </section>
            
            </div>
        </>
    )
}