import UserDetails from './UserDetails';
import useUser from '../hooks/useUser';

export default function UserManagement() {
    const { users, searchingUser, searchUser, reset, applyFilters,
        gender, setGender, role, setRole, bloodGroup, setBloodGroup, ageRange, setAgeRange,
        userPerPage, setUserPerPage, handleNext, handlePrev, currentPage, totalPages, firstUser, lastUser, 
        userInOnePage
    } = useUser();
    return(
        <>
            <header>
                <div className="flex items-center justify-between p-4 bg-white">
                    <h1 className="text-3xl font-bold mt-[5px] ml-[10px]">
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
                <UserDetails users={users} userInOnePage={userInOnePage} reset={reset} applyFilters={applyFilters}
                    gender={gender} setGender={setGender}
                    role={role} setRole={setRole}
                    bloodGroup={bloodGroup} setBloodGroup={setBloodGroup}
                    ageRange={ageRange} setAgeRange={setAgeRange}
                    userPerPage={userPerPage} handlePrev={handlePrev} handleNext={handleNext}
                    currentPage={currentPage} totalPages={totalPages} 
                    firstUser={firstUser} lastUser={lastUser} 
                    setUserPerPage={(value: string) => setUserPerPage(Number(value))}
                />
            </section>
        </>
    )
}