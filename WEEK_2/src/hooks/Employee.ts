import { useState, useEffect } from 'react';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  company: {
    department: string;
    title: string;
  };
};

export default function useEmployee(){
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filterDepartment, setFilterDepartment] = useState("");

    //add employee
    function addEmployee(employee: Employee){
        setEmployees((prev) => [...prev, employee]);
    }

    //remove employee
    function removeEmployees(){
        if (window.confirm("Remove all employees?")) {
        setEmployees([]);
        }
    }

    //fetch employee
    async function fetchEmployees(){
        try{
            const response: Response = await fetch("https://dummyjson.com/users");
            if(!response.ok){
                throw new Error("Failed to fetch employees");
            }
            const data = await response.json();

            const apiEmployees: Employee[] = data.users.map((emp: any)=> ({
                firstName: emp.firstName,
                lastName: emp.lastName,
                email: emp.email,
                company: {
                    department: emp.company.department,
                    title: emp.company.title,
                },
            }));

            setEmployees(apiEmployees);

        }catch(error){
            alert("Error fetching employees");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, []);

    //filterEmployee
    const filteredEmployees = employees.filter((emp) => {
        if(filterDepartment == '') return true;
        
        return emp.company.department
        .toLowerCase()
        .includes(filterDepartment.toLowerCase());
    })

    return {
    employees,
    filteredEmployees,
    filterDepartment,
    setFilterDepartment,
    addEmployee,
    removeEmployees,
    fetchEmployees,
  };
}

