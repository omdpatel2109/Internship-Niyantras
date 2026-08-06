export default function UserDetails() {
    return(
        <>
            <header>
                <div className="flex items-center justify-between border border-gray-300 p-4 bg-white rounded ml-[30px] mr-[30px] ">
                    <label className="w-[20%]">Gender:
                        <select className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80%] h-10">
                            <option value="">All</option>
                            <option value="male">Male</option>      
                            <option value="female">Female</option>  
                        </select>
                    </label>

                    <label className="w-[20%]">Role:
                        <select className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[85%] h-10">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>      
                            <option value="user">User</option>  
                        </select>
                    </label>

                    <label className="w-[20%]">Blood Group:
                        <select className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80%] h-10">
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
                    </label>

                    <label className="w-[20%]">Age Range:
                        <select className="ml-2 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80%] h-10">
                            <option value="">All Ranges</option>
                            <option value="0-18">0-18</option>
                            <option value="19-35">19-35</option>
                            <option value="36-50">36-50</option>
                            <option value="51+">51+</option>
                        </select>
                    </label>

                    <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Reset
                    </button>

                    <button className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Apply filters
                    </button>
                </div>
            </header>
        </>
    )
}