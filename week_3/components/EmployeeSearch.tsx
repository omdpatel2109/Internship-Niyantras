import { useEmployeeContext } from "@/context/EmployeeContext";

export default function EmployeeSearch() {
    const {
        searchEmployee,
        searchEmp,
        setSearchEmp,
        removeSearch,
    } = useEmployeeContext();
    return (
        <>
            <div className="flex gap-[15px] mt-[20px] max-[768px]:flex-col">
                <input
                    type="text"
                    value={searchEmp}
                    onChange={(e) => {
                        setSearchEmp(e.target.value);
                        searchEmployee();
                    }}
                    placeholder="Search employees..."
                    className="w-[250px] p-[10px] border border-[#ccc] rounded-[5px] max-[768px]:w-full mb-[15px]"
                
                />
                <button
                    // type="submit"
                    id="searchEmpButton"
                    className="mb-[15px] cursor-pointer rounded-[5px] border-0 bg-green-600 px-[18px] py-[10px] text-white transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#005fa3] focus:ring-offset-2 max-[768px]:w-full"
                    onClick={searchEmployee}
                    >
                    Search
                </button>

                <button
                    id="removeEmpButton"
                    className="px-[18px] py-[10px] bg-red-500 text-white border-0 rounded-[5px] cursor-pointer hover:bg-red-600 max-[768px]:w-full mb-[15px]"
                    onClick={removeSearch}
                    >
                    Clear Search
                </button>
            </div>
        </>
    )
};
