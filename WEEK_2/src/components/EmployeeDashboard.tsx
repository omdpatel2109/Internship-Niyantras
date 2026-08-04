import { useEmployeeContext } from "../context/EmployeeContext";

export default function EmployeeDashboard() {

    const {
        employees,
        filteredEmployees,
        searchEmp,
    } = useEmployeeContext();

    const departments = new Set(
        employees.map((employee) => employee.company.department)
    );

    return (
        <section className="mb-[30px] rounded-[8px] bg-white p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">

            <h2 className="mb-[20px] text-[20px] font-bold text-[#333]">
                Employee Dashboard
            </h2>

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">

                {/* Total Employees */}
                <div className="rounded-[8px] bg-blue-100 p-[20px]">
                    <h3 className="font-bold text-gray-700">
                        Total Employees
                    </h3>

                    <p className="mt-[10px] text-[30px] font-bold text-blue-700">
                        {employees.length}
                    </p>
                </div>


                {/* Departments */}
                <div className="rounded-[8px] bg-green-100 p-[20px]">
                    <h3 className="font-bold text-gray-700">
                        Departments
                    </h3>

                    <p className="mt-[10px] text-[30px] font-bold text-green-700">
                        {departments.size}
                    </p>
                </div>


                {/* Search Results */}
                <div className="rounded-[8px] bg-purple-100 p-[20px]">
                    <h3 className="font-bold text-gray-700">
                        {searchEmp ? "Search Results" : "Showing Employees"}
                    </h3>

                    <p className="mt-[10px] text-[30px] font-bold text-purple-700">
                        {filteredEmployees.length}
                    </p>
                </div>

            </div>

        </section>
    );
}