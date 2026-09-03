import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  const session = await decrypt(sessionCookie);

  return (
    <main className="min-h-screen bg-gray-100 p-10 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Welcome, {session?.email}
            </p>
          </div>

          <LogoutButton />
        </div>
      </div>
    </main>
  );
}