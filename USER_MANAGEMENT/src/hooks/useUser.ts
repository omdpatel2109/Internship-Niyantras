import { useState, useEffect} from "react";
import type { User } from '../type/userType';

export default function useUser(){

    const [users, setUsers] = useState<User[]>([]);
    const [searchingUser, setSearchingUser] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [filteringUser, setFilteringUser] = useState<User[]>([]);
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(10);

    //fetching data from api function
    async function fetchUser() {
        try{
            const response: Response = await fetch("https://dummyjson.com/users");
            const data = await response.json();
            setUsers(data.users);
            setAllUsers(data.users);
            setCurrentPage(1);
        }catch(error){
            alert('error fetching employee..');
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    //search user function
    async function searchUser(value: string) {
        setSearchingUser(value);

        if(value.trim() === "") {
            setUsers(allUsers);
            setCurrentPage(1);
            return;
        }

        try {
            const response: Response = await fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(value)}`);

            const data = await response.json();

            setUsers(data.users);
            setCurrentPage(1);

        }catch(error) {
            console.log("Error searching users:", error);
        }
    }


    //filter user function
    const applyFilters = () => {
        let filtered = allUsers;

        if (gender !== "") {
            filtered = filtered.filter((user) => user.gender === gender);
        }

        if (role !== "") {
            filtered = filtered.filter((user) => user.role === role);
        }

        if (bloodGroup !== "") {
            filtered = filtered.filter((user) => user.bloodGroup === bloodGroup);
        }

        if (ageRange !== "") {
            switch (ageRange) {
            case "18-26":
                filtered = filtered.filter(
                (user) => user.age >= 18 && user.age <= 26
                );
                break;

            case "26-35":
                filtered = filtered.filter(
                (user) => user.age >= 26 && user.age <= 35
                );
                break;

            case "35-45":
                filtered = filtered.filter(
                (user) => user.age >= 35 && user.age <= 45
                );
                break;

            case "45-55":
                filtered = filtered.filter(
                (user) => user.age >= 45 && user.age <= 55
                );
                break;
            }
        }

        setCurrentPage(1);
        setUsers(filtered);
    };

    //reset filter
    function reset(){
        setGender("");
        setAgeRange("");
        setRole("");
        setBloodGroup("");
        setCurrentPage(1);
        setUsers(allUsers);
    }

    const firstUserIndex = (currentPage - 1) * userPerPage;
    const lastUserIndex = firstUserIndex + userPerPage;
    const userInOnePage = users.slice(firstUserIndex, lastUserIndex);
    const firstUser = firstUserIndex + 1;
    const lastUser = Math.min(lastUserIndex, users.length);
    const totalPages = Math.ceil(users.length / userPerPage);

    function handleNext(){
        if(currentPage < totalPages){
            setCurrentPage((prev) => prev+1);
        }
    }
    function handlePrev(){
        if(currentPage > 1){
            setCurrentPage((prev) => prev-1);
        }
    }
    function handleUserPerPage(value: number) {
        setUserPerPage(value);
        setCurrentPage(1);
    }

    //personal details
    async function fetchUserById(id: number) {
        try {
            const response: Response = await fetch(`https://dummyjson.com/users/${id}`
        );

        const data: User = await response.json();

        return data;
        } catch (error) {
            console.log("Error fetching user:", error);
        }
    }
    
    return {
        users,
        searchingUser,
        setSearchingUser,
        searchUser,handleUserPerPage,

        gender,setGender,
        ageRange,setAgeRange,
        role,setRole,
        bloodGroup,setBloodGroup,
        filteringUser,setFilteringUser,
        applyFilters,
        reset,

        currentPage,setCurrentPage,userInOnePage,userPerPage, setUserPerPage,
        handleNext,handlePrev, totalPages, firstUser, lastUser,

        fetchUserById,
    }
}