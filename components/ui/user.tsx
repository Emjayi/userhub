"use client"
import React, { useEffect, useState } from 'react';

interface UserProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string
}

const User = ({ id, firstName, lastName, email, avatar }: UserProps) => {

    const [user, setUser] = useState([]);
    useEffect(() => {
        // fetch user data
        const fetchUserData = async () => {
            try {
                const res = await fetch(`https://reqres.in/api/users/1`);
                const json = await res.json();
                setUser(json.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div className='flex justify-center items-center h-[90vh] w-screen text-zinc-400'>
            <div className='flex flex-col justify-center items-center w-96 h-96'>
                <img className='mb-8' src={avatar} alt="user avatar" />
                <h1 className='text-white mb-2'>User Details</h1>
                <h2>User ID: {id}</h2>
                <h2>{firstName} {lastName}</h2>
                <h2>{email}</h2>
            </div>

        </div>
    );
};

export default User;