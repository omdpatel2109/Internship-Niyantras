import EmployeeRow from "./EmployeeRow";
import { useEmployeeContext } from "@/context/EmployeeContext";
import EmployeeSearch from "./EmployeeSearch";
import { Suspense } from "react";
import Loading from "./Loading";

export default function EmployeeList() {
    const {
        filteredEmployees,
        filterDepartment,
        setFilterDepartment,
        removeEmployees,
        searchEmployee,
        searchEmp,
        setSearchEmp,
        removeSearch,
        sortField,
        setSortField,
        sortEmployees,
    } = useEmployeeContext();
    return (
    <div className="bg-white p-[25px] rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">

        <h2
    id="employee-list-heading"
    className="mb-[20px] text-[20px] font-bold text-[#333]"
    >
    Employee List
    </h2>

        <div className="mb-[20px]">

        <Suspense fallback={<Loading/>}>
            <EmployeeSearch />
        </Suspense>

        <select
            className="w-[250px] p-[10px] border border-[#ccc] rounded-[5px] max-[768px]:w-full"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
        >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Support">Support</option>
            <option value="Research and Development">
            Research and Development
            </option>
            <option value="Human Resources">
            Human Resources
            </option>
            <option value="Product Management">
            Product Management
            </option>
            <option value="Marketing">Marketing</option>
            <option value="Services">Services</option>
            <option value="Accounting">Accounting</option>
            <option value="Training">Training</option>
            <option value="Sales">Sales</option>
        </select>

        <select
            className="w-[250px] p-[10px] border border-[#ccc] rounded-[5px] max-[768px]:w-full ml-[15px]"
            value={sortField}
            onChange={(e) => {
            setSortField(e.target.value);
            sortEmployees(e.target.value);
            }
        }
        >
            <option value="">Sort Employees..</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="department">Department</option>
            <option value="title">Title</option>
        </select>

        </div>


        <div className="overflow-x-auto">

        <table className="w-full border-collapse">

            <thead>

            <tr>

                <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                First Name
                </th>

                <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Last Name
                </th>

                <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Email
                </th>

                <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Department
                </th>

                <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Title
                </th>

            </tr>

            </thead>


            <tbody>

            {filteredEmployees.map((employee, index) => (
                    <EmployeeRow
                    key={index}
                    employee={employee}
                    />
            ))}

            </tbody>

        </table>

        </div>


        <div className="flex gap-[15px] mt-[20px] max-[768px]:flex-col">

        <button
            id="removeEmpButton"
            className="px-[18px] py-[10px] bg-[#0078d4] text-white border-0 rounded-[5px] cursor-pointer hover:bg-[#005fa3] max-[768px]:w-full"
            onClick={removeEmployees}
        >
            Remove All Employees
        </button>

        </div>

    </div>
    );
}