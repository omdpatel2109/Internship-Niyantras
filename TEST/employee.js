"use strict";
const employeeName = document.getElementById('employeeName');
const employeeLastName = document.getElementById('employeeLastName');
const employeeEmail = document.getElementById('employeeEmail');
const employeeDepartment = document.getElementById('employeeDepartment');
const employeeTitle = document.getElementById('employeeTitle');
const addEmployeeButton = document.getElementById('addEmployeeButton');
const addApiButton = document.getElementById('addApiButton');
//table data
const employeeTable = document.getElementById('employeeTable');
const employeeTableBody = document.getElementById('employeeTableBody');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const department = document.getElementById('department');
const title = document.getElementById('title');
//function to add an employee to the employee table
function addEmployee(employee) {
    //create a new row in the employee table and populate it with the employee data
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const lastNameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const departmentCell = document.createElement('td');
    const titleCell = document.createElement('td');
    if (!employee.firstName || !employee.lastName || !employee.email || !employee.company.department || !employee.company.title) {
        alert('Please fill in all fields before adding an employee.');
        return;
    }
    //populate the cells with the employee data
    nameCell.textContent = employee.firstName;
    lastNameCell.textContent = employee.lastName;
    emailCell.textContent = employee.email;
    departmentCell.textContent = employee.company.department;
    titleCell.textContent = employee.company.title;
    //append the cells to the row
    row.appendChild(nameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(departmentCell);
    row.appendChild(titleCell);
    //append the row to the employee table
    employeeTable.appendChild(row);
    //clear the input fields after adding the employee
    employeeName.value = '';
    employeeLastName.value = '';
    employeeEmail.value = '';
    employeeDepartment.value = '';
    employeeTitle.value = '';
    employeeName.focus();
}
;
addEmployeeButton.addEventListener('click', () => {
    const newEmployee = {
        firstName: employeeName.value,
        lastName: employeeLastName.value,
        email: employeeEmail.value,
        company: {
            department: employeeDepartment.value,
            title: employeeTitle.value
        }
    };
    addEmployee(newEmployee);
});
//detail shows of fetched api in table
async function fetchEmp() {
    const url = 'https://dummyjson.com/users';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        employeeTableBody.innerHTML = '';
        const data = await response.json();
        const empData = data.users;
        empData.forEach((emp) => {
            addEmployee(emp);
        });
    }
    catch (error) {
        alert(`Error fetching employee data: ${error}`);
    }
}
;
addApiButton.addEventListener('click', () => {
    const apiEmp = {
        firstName: employeeName.value,
        lastName: employeeLastName.value,
        email: employeeEmail.value,
        company: {
            department: employeeDepartment.value,
            title: employeeTitle.value
        }
    };
    fetchEmp();
});
//filter employee table based on search input
const filterDepartment = document.getElementById('filterDepartment');
filterDepartment.addEventListener('input', () => {
    const filterValue = filterDepartment.value.toLowerCase();
    const rows = employeeTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const departmentCell = rows[i].getElementsByTagName('td')[3];
        if (departmentCell) {
            const departmentText = departmentCell.textContent || '';
            if (departmentText.toLowerCase().indexOf(filterValue) > -1) {
                rows[i].style.display = '';
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
});
