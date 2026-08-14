"use client"
import { useState, useEffect } from "react"

type Theme = "light" | "dark" | 'system';

export default function ThemeToggle(){

    const [theme, setTheme] = useState<Theme>("system");

    function applyTheme(selectedTheme: Theme){
        const isDark = (selectedTheme==="dark") || (selectedTheme==="system" && 
            window.matchMedia("(prefers-color-scheme: dark)").matches);

        document.documentElement.classList.toggle("dark", isDark);
    }

    useEffect(()=>{
        const savedTheme = localStorage.getItem("theme") as Theme | null;

        if(savedTheme === "dark" || savedTheme === "light"){
            setTheme(savedTheme);
            applyTheme(savedTheme);
        }else{
            setTheme("system");
            applyTheme("system");
        }
    },[])

    function changeTheme(selectedTheme: Theme){
        setTheme(selectedTheme);

        if(selectedTheme === "system"){
            localStorage.removeItem("theme");
        }else{
            localStorage.setItem("theme", selectedTheme);
        }

        applyTheme(selectedTheme);
    }


    return (
        <div className="flex justify-center gap-2">
            <button onClick={() => changeTheme("light")}
                className={`rounded-lg px-3 py-2 ${ theme === "light" ? 
                    "bg-blue-600 text-white" : 
                    "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                }`}
            >
                Light
            </button>

            <button onClick={() => changeTheme("dark")}
                className={`rounded-lg px-3 py-2 ${ theme === "dark" ? 
                    "bg-blue-600 text-white" : 
                    "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                }`}
            >
                Dark
            </button>

            <button
                onClick={() => changeTheme("system")}
                className={`rounded-lg px-3 py-2 ${ theme === "system" ? 
                    "bg-blue-600 text-white" : 
                    "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                }`}
            >
                System
            </button>
        </div>
    );
}