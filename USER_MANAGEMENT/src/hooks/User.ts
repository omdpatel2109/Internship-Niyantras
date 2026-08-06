import { error } from "console";
import { useState, useEffect } from "react";

export default function useUser(){

    const [users, setUsers] = useState("");

    async function fetchUser() {
        try{
            const response: Response = await fetch("https://dummyjson.com/users");
            const data = await response.json();

            const userlist = data.map();
        }catch(error){
            alert('error fetching employee..');
            console.log(error);
        }
    }
}