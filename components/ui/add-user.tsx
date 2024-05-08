import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

export default function AddUser() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const res = await fetch(`https://reqres.in/api/users`);
                const json = await res.json();
                setUsers(json.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUsersData();
    }, []);

    const handleAddUser = () => (
        alert("wtf??")
    )
    return (
        <>
            <Button onPress={onOpen} color="primary">Add User</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add User</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input type="text" label="First Name" />
                                    <Input type="text" label="Last Name" />
                                    <Input type="email" label="Email" />
                                    {/* <Input type="file" label="Avatar" /> */}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" formMethod="post" formAction={handleAddUser}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
