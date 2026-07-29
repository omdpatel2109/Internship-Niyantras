import EmployeeRow from "./EmployeeRow";
import type { Employee } from "./type";
// import { EmployeeSystem } from "./EmployeeSystem";   

type Props = {
  employees: Employee[];
  removeEmployees: () => void;
};

export default function EmployeeList({ employees, removeEmployees, }: Props) {
  return (
    <>
      <h2>Employee List</h2>

      <table border={1}>
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
          {employees.map((employee, index) => (
            <EmployeeRow key={index} employee={employee} />
          ))}
        </tbody>
      </table>
      <button onClick={removeEmployees}>
        Remove All Employees
        </button>
    </>
  );
}