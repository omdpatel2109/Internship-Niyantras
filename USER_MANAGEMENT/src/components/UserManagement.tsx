import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';

export default function UserManagement() {
    return(
        <>
            <header>
                <div className="flex items-center justify-between p-4 bg-white">
                    <h1 className="text-3xl font-bold mt-[5px] ml-[10px]">
                        User Management
                    </h1>
                    <input 
                        type="text"
                        placeholder="Search users..."
                        className="text-left border border-gray-300 rounded mt-[5px] mr-[200px] py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[40%]"
                    />
                </div>
            </header>


            <section>
                <UserDetails />
            </section>
        </>
    )
}