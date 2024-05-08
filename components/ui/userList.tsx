import React, { useEffect, useState } from 'react';
import { HoverEffect } from './card-hover-effect';
import { Pagination } from "@nextui-org/pagination";
import AddUser from './add-user';
import { Button, user } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchUsersData = async () => {
        try {
            const res = await fetch(`https://reqres.in/api/users?page=${page}`);
            const json = await res.json();
            setUsers(json.data);

            // Extract total pages from the API response
            const totalPagesFromApi = json.total_pages;
            setTotalPages(totalPagesFromApi);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, [page]);

    const handlePagination = (newPage: number) => {
        setPage(newPage);
    };

    const reloadUsersData = () => (
        fetchUsersData()
    )

    return (
        <div className="flex flex-col justify-center items-center text-white min-h-screen">
            <div className='flex gap-4'><AddUser /><Button color='secondary' onClick={() => reloadUsersData()}>Reload</Button></div>
            <div className="flex">
                <HoverEffect items={users} />
            </div>
            <div className="flex mt-4">
                <Pagination
                    total={totalPages}
                    initialPage={1}
                    page={page}
                    onChange={handlePagination}
                />
            </div>
        </div>
    );
};

export default UserList;
