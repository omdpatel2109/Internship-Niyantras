interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    company:
    {
        department: string;
        title: string;
    }
}

//for api
interface EmployeeResponse {
    users: Employee[];
    total: number;
    skip: number;
    limit: number;
}
type UsersOnly = Pick<EmployeeResponse, "users">;


const employeeName = document.getElementById('employeeName') as HTMLInputElement;
const employeeLastName = document.getElementById('employeeLastName') as HTMLInputElement;
const employeeEmail = document.getElementById('employeeEmail') as HTMLInputElement;
const employeeDepartment = document.getElementById('employeeDepartment') as HTMLInputElement;
const employeeTitle = document.getElementById('employeeTitle') as HTMLInputElement;
const addEmployeeButton = document.getElementById('addEmployeeButton') as HTMLButtonElement;
const addApiButton = document.getElementById('addApiButton') as HTMLButtonElement;
//table data
const employeeTable = document.getElementById('employeeTable') as HTMLTableElement;
const employeeTableBody = document.getElementById('employeeTableBody') as HTMLTableSectionElement;
const firstName = document.getElementById('firstName') as HTMLTableCellElement;
const lastName = document.getElementById('lastName') as HTMLTableCellElement;
const email = document.getElementById('email') as HTMLTableCellElement;
const department = document.getElementById('department') as HTMLTableCellElement;
const title = document.getElementById('title') as HTMLTableCellElement; 
const removeEmpButton = document.getElementById('removeEmpButton') as HTMLButtonElement;

//function to add an employee to the employee table
function addEmployee (employee: Employee): void {
    //create a new row in the employee table and populate it with the employee data
    const row: HTMLTableRowElement = document.createElement('tr');
    const nameCell: HTMLTableCellElement = document.createElement('td');
    const lastNameCell: HTMLTableCellElement = document.createElement('td');
    const emailCell: HTMLTableCellElement = document.createElement('td');
    const departmentCell: HTMLTableCellElement = document.createElement('td');
    const titleCell: HTMLTableCellElement = document.createElement('td');

        if(!employee.firstName || !employee.lastName || !employee.email || !employee.company.department || !employee.company.title){
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
    
    //append the row to the employee table body
    employeeTableBody.appendChild(row);

    //clear the input fields after adding the employee
    employeeName.value = '';
    employeeLastName.value = '';
    employeeEmail.value = '';
    employeeDepartment.value = '';
    employeeTitle.value = '';
    employeeName.focus();
};
addEmployeeButton.addEventListener('click', () => {
    const newEmployee: Employee = {
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
async function fetchEmp() : Promise<void> {
    const url: string = 'https://dummyjson.com/users';
    try{
        const response: Response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        employeeTableBody.innerHTML = '';
        const data: UsersOnly = await response.json();
        const empData: Employee[] = data.users;
        empData.forEach((emp: Employee): void => {
            addEmployee(emp);
        })
        // employeeTable.innerHTML = '';
        // employeeTableBody.remove();
    }catch(error){
        alert(`Error fetching employee data: ${error}`);
    }
};
addApiButton.addEventListener('click', () => {
    const apiEmp: Employee = {
        firstName: employeeName.value,
        lastName: employeeLastName.value,
        email: employeeEmail.value,
        company: {
            department: employeeDepartment.value,
            title: employeeTitle.value
        }
    };
    fetchEmp();
})


//filter employee table based on search input
const filterDepartment = document.getElementById('filterDepartment') as HTMLInputElement;
filterDepartment.addEventListener('input', () => {
    const filterValue: string = filterDepartment.value.toLowerCase();
    const rows: HTMLCollectionOf<HTMLTableRowElement> = employeeTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const departmentCell: HTMLTableCellElement = rows[i].getElementsByTagName('td')[3];
        if (departmentCell) {
            const departmentText: string = departmentCell.textContent || '';
            if (departmentText.toLowerCase().indexOf(filterValue) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
});


// Remove button
const remove = (): void => {
    if (confirm("Remove all employees?")) {
        employeeTableBody.innerHTML = "";
    }
};

removeEmpButton.addEventListener("click", remove);