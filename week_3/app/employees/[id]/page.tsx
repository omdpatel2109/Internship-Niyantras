import { notFound } from "next/navigation";
import EmployeeDetails from "@/components/EmployeeDetails";

type Props = {
    params: Promise<{
      id: string;
    }>;
};

export default async function EmployeeDetailsPage({ params }: Props) {
    const { id } = await params;

    const response = await fetch(`https://dummyjson.com/users/${id}`);

    if (!response.ok) {
        notFound();
    }

    const emp = await response.json();

    const employee = {
        id: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        company: {
        department: emp.company.department,
        title: emp.company.title,
        },
    };

    return (
        <main className="min-h-screen bg-[#f4f6f9] px-[20px] py-[30px]">
        <div className="mx-auto w-full max-w-[900px]">
            <EmployeeDetails employee={employee} />
        </div>
        </main>
    );
}