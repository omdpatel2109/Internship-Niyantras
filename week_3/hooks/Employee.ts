"use client";
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
    const [searchEmp, setSearchEmp] = useState("");
    const [allEmployee, setAllEmployee] = useState<Employee[]>([]); //for when clear the search automatic show all the list
    const [sortField, setSortField] = useState<string>("");
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
            setAllEmployee(apiEmployees); // Store the fetched employees in allEmployee state

        }catch(error){
            alert("Error fetching employees");
            console.error(error);
        }finally {
            setLoading(false);
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


    //search employee by firstname, lastname, title, email ,department
    async function searchEmployee(value: string) {
        setSearchEmp(value);

        if(value.trim() === ""){
            setEmployees(allEmployee);
            return;
        }

        try{
            const response: Response = await fetch(`https://dummyjson.com/users/search?q=${value}`);
            const data: any = await response.json();
            setEmployees(data.users);
        }catch(error){
            console.error(error);
        }
    }
        
    
    //remove search
    function removeSearch(){
        setSearchEmp('');
        setEmployees(allEmployee);
    }

    //sort by fname, lname,dept,emil,title
    function sortEmployees(field: string) {
        const sortedEmployees = [...employees].sort((a, b) => {
            const valueA = a[field as keyof Employee] as string;
            const valueB = b[field as keyof Employee] as string;

            return valueA.localeCompare(valueB);
        });

        setEmployees(sortedEmployees);  
    }



    return {
        employees,
        filteredEmployees,
        filterDepartment,
        setFilterDepartment,
        addEmployee,
        removeEmployees,
        fetchEmployees,
        searchEmp,
        setSearchEmp,
        searchEmployee,
        removeSearch,
        sortField,
        setSortField,
        sortEmployees,
        setLoading,loading,
    };
}


