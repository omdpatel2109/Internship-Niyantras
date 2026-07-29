type Props = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;

  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  addEmployee: () => void;
    fetchEmp: () => void;
};

export default function EmployeeForm({
  firstName,
  lastName,
  email,
  department,
  title,
  setFirstName,
  setLastName,
  setEmail,
  setDepartment,
  setTitle,
  addEmployee,
  fetchEmp, 
}: Props) {
  return (
    <>
      <h2>Add Employee</h2>
      <label>Enter First Name:</label>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br />
      <br />
      <label>Enter Last Name:</label>
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <br />
      <br />

      <label>Enter Email:</label>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <label>Enter Department:</label>
      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br />
      <br />

      <label>Enter Title:</label>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addEmployee}>Add Employee</button>


    <button onClick={fetchEmp}>
        Fetch Employees
    </button>
    </>
  );
}