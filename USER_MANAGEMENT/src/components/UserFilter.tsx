import { Search } from 'lucide-react';
import type {User} from '../type/userType';

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
}

export default function UserFilter({users, reset, applyFilters, gender, 
    setGender, role, setRole, bloodGroup, 
    setBloodGroup, ageRange, setAgeRange,
    }: Props) {
    return(
        <>
            <header>
                <div className="flex items-center justify-between border border-gray-300 p-4 bg-white rounded-2xl ml-[30px] mr-[30px] ">
                    <span className="w-[20%]">Gender:
                        <select value={gender} className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80%] h-10"
                        onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="male">Male</option>      
                            <option value="female">Female</option>  
                        </select>
                    </span>

                    <span className="w-[20%]">Role:
                        <select value={role} className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[85%] h-10"
                        onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>      
                            <option value="user">User</option> 
                            <option value="moderator">Moderator</option>  
                        </select>
                    </span>

                    <span className="w-[20%]">Blood Group:
                        <select value={bloodGroup} className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80%] h-10"
                        onChange={(e) => setBloodGroup(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="A+">A+</option>      
                            <option value="A-">A-</option>  
                            <option value="B+">B+</option>      
                            <option value="B-">B-</option>  
                            <option value="AB+">AB+</option>      
                            <option value="AB-">AB-</option>  
                            <option value="O+">O+</option>      
                            <option value="O-">O-</option>  
                        </select>
                    </span>

                    <span className="w-[20%]">Age Range:
                        <select value={ageRange} className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80%] h-10"
                        onChange={(e) => setAgeRange(e.target.value)}
                        >
                            <option value="">All Ranges</option>
                            <option value="18-26">18-26</option>
                            <option value="26-35">26-35</option>
                            <option value="35-45">35-45</option>
                            <option value="45-55">45-55</option>
                        </select>
                    </span>

                    <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={reset}
                    >
                        Reset
                    </button>

                    <button className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={applyFilters}
                    >
                        Apply filters
                    </button>
                </div>
            </header>
        </>
    )
}