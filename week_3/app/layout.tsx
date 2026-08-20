import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: './fonts/myFont.ttf'
})

export default async function RootLayout({children}: any) {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);

  return (
    <html lang="en" className={myFont.className}>
      <body className="min-h-screen bg-white dark:bg-black font-sans">

        <header className="border-b bg-white dark:bg-gradient-to-r dark:from-black dark:to-gray-800 px-6 py-4 shadow-sm">
          <nav className="mx-auto flex max-w-[900px] items-center justify-between">
            <h1 className="text-xl font-bold text-black dark:text-gray-200">
              Employee Management
            </h1>

            <div className="flex gap-5">
              <Link href="/" className="text-blue-600 dark:text-white hover:underline">
                Home
              </Link>

              <Link href="/employees" className="text-blue-600 dark:text-white hover:underline">
                Employees
              </Link>

              <Link href="/dashboard" className="text-blue-600 dark:text-white hover:underline">
                Dashboard
              </Link>

              {session?.email ? ( " " ) : (
                <Link href="/login" className="text-blue-600 dark:text-white hover:underline">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        {children}

      </body>
    </html>
  );
}