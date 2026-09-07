import { useState } from "react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    function toggleTheme() {
        setDarkMode(!darkMode);

        document.documentElement.classList.toggle("dark");
    }

    return (
        <div className="flex justify-center items-center mt-[20px]">
            <button
                onClick={toggleTheme}
                className="rounded-lg border border-border bg-bg-card px-4 py-2 text-text-main"
            >
                {darkMode ? "Light" : "Dark"}
            </button>
        </div>
    );
}