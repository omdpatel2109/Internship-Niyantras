import type { Employee } from "./type";

type Props = {
  employee: Employee;
};

export default function EmployeeRow({ employee }: Props) {
  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.company.department}</td>
      <td>{employee.company.title}</td>
    </tr>
  );
}