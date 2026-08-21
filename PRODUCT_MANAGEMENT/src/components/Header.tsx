import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 text-white shadow-md">
      <h1 className="text-xl font-bold">
        Store
      </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-medium hover:bg-red-600"
        >
          Logout
        </button>

    </header>
  );
}