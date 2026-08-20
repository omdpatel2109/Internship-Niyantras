import type { Employee } from "./type";
import EmployeeRow from "./EmployeeRow";
import EmployeeSearch from "./EmployeeSearch";
import { useEmployeeContext } from "@/context/EmployeeContext";

export default function EmployeeList() {
  const {
    filteredEmployees = [],
    filterDepartment,
    setFilterDepartment,
    sortField,
    setSortField,
    sortEmployees,
  } = useEmployeeContext();
  return (
    <div className="bg-white p-[25px] rounded-[8px] w-full">
      <h2
        id="employee-list-heading"
        className="mb-[20px] text-[20px] font-bold text-gray-800"
      >
        Employee List
      </h2>

      <div className="mb-[20px]">

        <EmployeeSearch />

        <select
          className="w-[250px] p-[10px] border border-gray-400 rounded-[5px] max-[768px]:w-full"
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
          <option value="Legal">Legal</option>
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
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Action
              </th>
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <EmployeeRow key={index} employee={employee} />
            ))}
          </tbody>
        </table>  
      </div>
    </div>
  );
}