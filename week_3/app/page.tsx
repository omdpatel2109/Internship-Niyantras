import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
    return (
        <main className="min-h-screen p-10 bg-gradient-to-r from-blue-200 to-pink-300 dark:bg-gradient-to-r dark:from-black dark:to-gray-800">

            <div className="flex justify-center mt-[30px] p-[100px] bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-2xl dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-500 dark:to-gray-300">

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Employee Management System
                </h1>

            </div>

            <p className="mt-4 flex justify-center p-[25px] text-2xl text-gray-900 dark:text-white">
              Welcome to the Employee Management System.
            </p>

            
            <ThemeToggle/>
            

        </main>
    );
}