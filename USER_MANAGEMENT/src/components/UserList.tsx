import UserListRow from './UserListRow';
import {useUserContext} from '../context/UserContext'
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function UserList() {   
    
    const {
        users, userInOnePage, totalPages,
        currentPage, firstUser, lastUser, handleUserPerPage,
        userPerPage, handleNext, handlePrev
    } = useUserContext();

    return(
        <>
            <div className="border border-gray-300 p-4 bg-white rounded-2xl ml-[30px] mr-[30px] mt-[30px]">
                <table className="w-full border border-collapse rounded-xl">
                    <thead>
                        <tr>
                            <th className="border-b border-t border-l border-gray-400 p-[12px] text-left bg-gray-100 text-black">
                                
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
                        {userInOnePage.map((user) =>(
                            <UserListRow key={user.id} user={user}/>
                            ))
                        }
                    </tbody>
                </table>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-700">Items Per Page: 
                        <select
                            className='border ml-[2px] border-gray-400 rounded'
                            value={userPerPage}
                            onChange={(e) => {
                                handleUserPerPage(Number(e.target.value));
                            }}
                        >
                            {Array.from({ length: 10 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </span>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>{firstUser}-{lastUser} of {users.length}</span>
                        <button onClick={handlePrev} disabled={currentPage===1}>    
                            <ChevronLeft className="h-4 w-4 ml-2 cursor-pointer" aria-hidden="true"/>
                        </button>
                        <button onClick={handleNext} disabled={currentPage===totalPages}>    
                            <ChevronRight className="h-4 w-4 ml-2 cursor-pointer" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}