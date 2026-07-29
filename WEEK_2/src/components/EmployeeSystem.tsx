import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  company: {
    department: string;
    title: string;
  };
};

export default function EmployeeSystem() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");

  function addEmployee() {
    if (!firstName || !lastName || !email || !department || !title) {
      alert("Fill all fields");
      return;
    }

    const newEmployee: Employee = {
      firstName,
      lastName,
      email,
      company: {
        department,
        title,
      },
    };

    setEmployees([...employees, newEmployee]);

    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setTitle("");
  }

  async function fetchEmp() {
  try {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = await response.json();

    const apiEmployees: Employee[] = data.users.map((emp: any) => ({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      company: {
        department: emp.company.department,
        title: emp.company.title,
      },
    }));

    setEmployees(apiEmployees);
  } catch (error) {
    alert("Error fetching employees");
    console.error(error);
  }
}

    function removeEmployees() {
  const confirmDelete = window.confirm("Remove all employees?");

  if (confirmDelete) {
    setEmployees([]);
  }
}

    return (
  <div className="container">
    <div className="header">
      <h1>Employee Management System</h1>
      <p>Welcome to the Employee Management System!</p>
    </div>

    <EmployeeForm
      firstName={firstName}
      lastName={lastName}
      email={email}
      department={department}
      title={title}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setDepartment={setDepartment}
      setTitle={setTitle}
      addEmployee={addEmployee}
      fetchEmp={fetchEmp}
    />

    <EmployeeList
      employees={employees}
      removeEmployees={removeEmployees}
    />
  </div>
);
}

export {EmployeeSystem};