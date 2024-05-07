import React, { useEffect, useState } from 'react';
import { HoverEffect } from './card-hover-effect';
import { Pagination } from "@nextui-org/pagination";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
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

        fetchUsersData();
    }, [page]);

    const handlePagination = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="flex flex-col justify-center items-center text-white h-screen">
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
