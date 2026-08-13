import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: any) {
  return (
    <html lang="en" className="dark">
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
            </div>
          </nav>
        </header>

        {children}

      </body>
    </html>
  );
}