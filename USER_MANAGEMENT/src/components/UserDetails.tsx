import UserFilter from './UserFilter';
import UserList from './UserList';
import type { User } from '../type/userType';

interface Props {
    users: User[],
    reset: () => void,
    applyFilters: () => void,
    gender: string,
    setGender: (value: string) => void,
    role: string,
    setRole: (value: string) => void,
    bloodGroup: string,
    setBloodGroup: (value: string) => void,
    ageRange: string,
    setAgeRange: (value: string) => void,
    userPerPage: number,
    handlePrev: () => void,
    handleNext: () => void,
    currentPage: number,
    totalPages: number,
    firstUser: number,
    lastUser: number,
    userInOnePage: User[], //pagination user
    setUserPerPage: (value: string) => void,
}

export default function UserDetails({ 
    users, userInOnePage, reset, applyFilters, 
    gender, setGender, role, setRole,
    bloodGroup, setBloodGroup, ageRange, 
    setAgeRange, userPerPage, setUserPerPage,
    handleNext, handlePrev, currentPage, totalPages, firstUser, lastUser
    }: Props) {
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
                    <UserList users={userInOnePage} totalUsers={users.length} userPerPage={userPerPage}
                    handleNext={handleNext} handlePrev={handlePrev}
                    currentPage={currentPage} totalPages={totalPages}
                    firstUser={firstUser} lastUser={lastUser} setUserPerPage={setUserPerPage}
                    />
                </section>
            
            </div>
        </>
    )
}