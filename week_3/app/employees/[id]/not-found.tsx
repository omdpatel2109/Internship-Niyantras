import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-[20px]">
        <div className="rounded-[8px] bg-black p-[40px] text-center">
            <h1 className="mb-[15px] text-[28px] font-bold text-gray-300">
            Employee Not Found
            </h1>

            <p className="mb-[25px] text-gray-400">
            The employee you are looking for does not exist.
            </p>

            <Link
            href="/employees"
            className="inline-block rounded-[5px] bg-[#0078d4] px-[18px] py-[10px] text-white hover:bg-blue-700"
            >
            Back to Employees
            </Link>
        </div>
        </main>
    );
}