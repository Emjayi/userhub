"use client"
import User from '@/components/ui/user';
import React, { useEffect, useState } from 'react';

const Page = ({ id }: { id: number }) => {

    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`);
            const userData = await response.json();
            setUser(userData.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return (
        <User id={id} name={user.first_name} />
    );
}

export default Page;