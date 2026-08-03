type Props = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;

  setFirstName: React.Dispatch<React.SetStateAction<string>>; // Corrected type for setFirstName update the characters
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
    <div className="bg-white p-[25px] rounded-[8px]  shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addEmployee();
          }}
          aria-labelledby="add-employee-heading"
          className="w-full"
        >
          <h2
            id="add-employee-heading"
            className="mb-[25px] text-[20px] font-bold text-[#333]"
          >
            Add Employee
          </h2>

          {/* First Name */}
          <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
            <label
              htmlFor="firstName"
              className="w-[170px] shrink-0 font-bold max-[768px]:mb-[6px]"
            >
              Enter First Name:
            </label>

            <input
              id="firstName"
              type="text"
              name="firstName"
              autoComplete="given-name"
              required
              className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
            <label
              htmlFor="lastName"
              className="w-[170px] shrink-0 font-bold max-[768px]:mb-[6px]"
            >
              Enter Last Name:
            </label>

            <input
              id="lastName"
              type="text"
              name="lastName"
              autoComplete="family-name"
              required
              className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
            <label
              htmlFor="email"
              className="w-[170px] shrink-0 font-bold max-[768px]:mb-[6px]"
            >
              Enter Email:
            </label>

            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
            <label
              htmlFor="department"
              className="w-[170px] shrink-0 font-bold max-[768px]:mb-[6px]"
            >
              Enter Department:
            </label>

            <input
              id="department"
              type="text"
              name="department"
              required
              className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Title */}
          <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
            <label
              htmlFor="title"
              className="w-[170px] shrink-0 font-bold max-[768px]:mb-[6px]"
            >
              Enter Title:
            </label>

            <input
              id="title"
              type="text"
              name="title"
              required
              className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="mt-[30px] flex w-full gap-[15px] max-[768px]:flex-col">
            <button
              type="submit"
              className="cursor-pointer rounded-[5px] border-0 bg-[#0078d4] px-[18px] py-[10px] text-white transition duration-300 hover:bg-[#005fa3] focus:outline-none focus:ring-2 focus:ring-[#005fa3] focus:ring-offset-2 max-[768px]:w-full"
            >
              Add Employee
            </button>

            <button
              type="button"
              onClick={fetchEmp}
              className="cursor-pointer rounded-[5px] border-0 bg-[#0078d4] px-[18px] py-[10px] text-white transition duration-300 hover:bg-[#005fa3] focus:outline-none focus:ring-2 focus:ring-[#005fa3] focus:ring-offset-2 max-[768px]:w-full"
            >
              Fetch Employees
            </button>
          </div>
        </form>
        </div>
    </>
  );
}