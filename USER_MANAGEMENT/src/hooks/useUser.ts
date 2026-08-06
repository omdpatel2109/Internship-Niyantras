import { useState, useEffect, useRef } from "react";
import type { User } from '../type/UserType';

export default function useUser(){

    const [users, setUsers] = useState<User[]>([]);
    const [searchingUser, setSearchingUser] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [filteringUser, setFilteringUser] = useState<User[]>([]);
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [ageRange, setAgeRange] = useState("");


    useEffect(() => { fetchUser(); }, []);


    //fetching data from api function
    async function fetchUser() {
        try{
            const response: Response = await fetch("https://dummyjson.com/users");
            const data = await response.json();
            setUsers(data.users);
            setAllUsers(data.users);
        }catch(error){
            alert('error fetching employee..');
            console.log(error);
        }
    }

    //search user function
    function searchUser(value: string){
        setSearchingUser(value);
        const search = value.toLowerCase();
        const searchedUser = allUsers.filter((user) =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(search)
            )
        setUsers(searchedUser);
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
            case "0-18":
                filtered = filtered.filter(
                (user) => user.age >= 0 && user.age <= 18
                );
                break;

            case "19-35":
                filtered = filtered.filter(
                (user) => user.age >= 19 && user.age <= 35
                );
                break;

            case "36-50":
                filtered = filtered.filter(
                (user) => user.age >= 36 && user.age <= 50
                );
                break;

            case "51+":
                filtered = filtered.filter(
                (user) => user.age >= 51
                );
                break;
            }
        }

        setUsers(filtered);
    };

    //reset filter
    function reset(){
        setGender("");
        setAgeRange("");
        setRole("");
        setBloodGroup("");
        setUsers(allUsers);
    }

    return {
        users,
        searchingUser,
        setSearchingUser,
        searchUser,

        gender,setGender,
        ageRange,setAgeRange,
        role,setRole,
        bloodGroup,setBloodGroup,
        filteringUser,setFilteringUser,
        applyFilters,
        reset,
    }
}