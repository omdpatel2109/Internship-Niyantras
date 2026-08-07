import UserListRow from './UserListRow';
import useUser from '../hooks/useUser';
import type {User} from '../type/userType';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    users: User[],
    totalUsers: number,
    userPerPage: number,
    handleNext: () => void,
    handlePrev: () => void,
    currentPage: number,
    totalPages: number,
    firstUser: number,
    lastUser: number,
    setUserPerPage: (value: string) => void,
}

export default function UserList({users, totalUsers, userPerPage, setUserPerPage,
    handleNext, handlePrev, currentPage, totalPages, firstUser, lastUser
    }: Props) {    
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
                        {users.map((user) =>(
                            <UserListRow key={user.id} user={user}/>
                            ))
                        }
                    </tbody>
                </table>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-700">Items Per Page: 
                        <select className='border ml-[2px] border-gray-400 rounded'
                        onChange={(e) => {
                            setUserPerPage(e.target.value);
                        }}
                        >
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </span>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>{firstUser}-{lastUser} of {totalUsers}</span>
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