import { useNavigate } from 'react-router';

import useUserStore from '@/store/userStore';
import TablePagination from '@/components/elements/TablePagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useUsersQuery } from '../api';
import { UserAddress } from '../types';

export const UsersPage = () => {
    const navigate = useNavigate()
    const { setSelectedUser, currentPage, setCurrentPage } = useUserStore();
    const { data, isLoading, error } = useUsersQuery()
    const { users, pagination } = data ?? {}

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Record<string, string>).message}</div>;

    const handleNavigation = (user: UserAddress) => {
        setSelectedUser(user)
        navigate(`/users/${user.user_id}/posts`)
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            <h1 className="text-6xl font-bold mb-4">Users</h1>
            <Table className="border rounded-md">
                <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead className="max-w-[392px]">Address</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.id} onClick={() => handleNavigation(user)} className="cursor-pointer">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="py-6">{user.email}</TableCell>
                        <TableCell className="w-[392px] max-w-[392px] text-ellipsis overflow-hidden text-nowrap">
                            {`${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <TablePagination 
                totalPages={pagination?.pages ?? 0} 
                currentPage={currentPage} 
                onPageChange={(page) => setCurrentPage(page)} 
            />
        </div>
    );
}