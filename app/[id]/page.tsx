"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import User from '@/components/ui/user';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

const Page = () => {
    const id = usePathname();

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        try {
            if (id) {
                const response = await fetch(`https://reqres.in/api/users${id}`);
                const userData = await response.json();
                console.log(userData); // Check API response format
                setUser(userData.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Error fetching user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    if (loading) {
        return <div className='flex justify-center items-center text-center h-screen content-center'><p className=''>Loading user information...</p></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>No user found.</p>;
    }

    return (
        <div className='h-screen'>
            <User
                id={user.id}
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
                avatar={user.avatar}
            />
        </div>
    );
};

export default Page;
