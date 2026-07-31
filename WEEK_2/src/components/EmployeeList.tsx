import EmployeeRow from "./EmployeeRow";
import { useEmployeeContext } from "../context/EmployeeContext";

type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  company: {
    department: string;
    title: string;
  };
};

// type Props = {
//   employees: Employee[];
//   filterDepartment: string;
//   setFilterDepartment: React.Dispatch<React.SetStateAction<string>>;
//   removeEmployees: () => void;
// };

export default function EmployeeList() {
  const {
  filteredEmployees,
  filterDepartment,
  setFilterDepartment,
  removeEmployees,
} = useEmployeeContext();
  return (
    <div className="employee-table">
      <h2>Employee List</h2>
      <div className="filter">
      <select
        value={filterDepartment}
        onChange={(e) => setFilterDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="Support">Support</option>
        <option value="Research and Development">
          Research and Development
        </option>
        <option value="Human Resources">Human Resources</option>
        <option value="Product Management">Product Management</option>
        <option value="Marketing">Marketing</option>
        <option value="Services">Services</option>
        <option value="Accounting">Accounting</option>
        <option value="Training">Training</option>
        <option value="Sales">Sales</option>
      </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee, index) => (
            <EmployeeRow key={index} employee={employee} />
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button id="removeEmpButton" onClick={removeEmployees}>
          Remove All Employees
        </button>
      </div>
    </div>
  );
}