"use client";
import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeDashboard from "./EmployeeDashboard";

export default function EmployeeSystem() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");

    const {
    addEmployee,
    fetchEmployees,
    
    } = useEmployeeContext();

    function handleAddEmployee() {
    if (!firstName || !lastName || !email || !department || !title) {
        alert("Fill all fields");
        return;
    }

    addEmployee({
        firstName,
        lastName,
        email,
        company: {
        department,
        title,
        },
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setTitle("");
    }

        return (
    <div className="min-h-screen w-full bg-[#f4f6f9] px-[30px] py-[30px] font-sans">

        {/* Main centered container */}
        <div className="mx-auto w-full max-w-[900px]">

        {/* Header */}
        <header className="mb-[30px] text-center">
            <h1 className="mb-[10px] text-[28px] font-bold text-[#333]">
            Employee Management System
            </h1>

            <p className="text-[16px] text-[#666]">
            Welcome to the Employee Management System!
            </p>
        </header>

        {/* Employee Dashboard */}
        <section>
                    <EmployeeDashboard />
        </section>

        {/* Employee Form */}
        <section
            aria-labelledby="add-employee-heading"
            className="mb-[30px] w-full rounded-[8px] bg-white p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
        >
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

            addEmployee={handleAddEmployee}
            fetchEmp={fetchEmployees}
            />
        </section>

        {/* Employee List */}
        <section className="mb-[30px] w-full rounded-[8px] bg-white p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <EmployeeList />
        </section>

        </div>
    </div>
    );
    }

export {EmployeeSystem};
