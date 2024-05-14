import React, { useEffect, useState } from 'react';
import { HoverEffect } from './card-hover-effect';
import { Pagination } from "@nextui-org/pagination";
import AddUser from './add-user';
import { Button, user } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { update } from '@barba/core/dist/core/src/utils/helpers';
import { patchFetch } from 'next/dist/server/app-render/entry-base';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true)
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
        } finally {
            setLoading(false)
        }
    };

    // const updateUsersData = async () => {
    //     const res = await patchFetch(`https://reqres.in/api/users`)
    //     const json = await res.json()
    //     json.data.push(user)
    // }


    useEffect(() => {
        fetchUsersData();
    }, [page]);

    if (loading) {
        return <div className='flex justify-center items-center text-center h-screen content-center'><p className=''>Loading users...</p></div>;
    }

    const handlePagination = (newPage: number) => {
        setPage(newPage);
    };

    const reloadUsersData = () => (
        fetchUsersData()
    )

    return (
        <div className="flex flex-col justify-center items-center text-white min-h-screen">
            <div className="flex md:order-2">
                <HoverEffect items={users} />
            </div>
            <div className='flex gap-1 md:order-1'>
                <AddUser />
                <Button color='secondary' onClick={() => reloadUsersData()}>Reload</Button>
            </div>
            <div className="flex mt-4 md:order-3">
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
