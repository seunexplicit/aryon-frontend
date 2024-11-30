import useUserStore from '@/store/userStore';
import { environmentVar } from '@/lib/constant';
import { useQuery } from '@tanstack/react-query';
import { User, UserAddress } from '@/types';

export const useUsersQuery = () => {
    const { currentPage } = useUserStore()

    const query = useQuery<{ users: UserAddress[], pagination: { totalPages: number, pages: number} }>(
        ['users', currentPage],
        async () => {
            const response = await fetch(`${environmentVar.BASE_URL}/api/users?page=${currentPage}&limit=4`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json();
        },
    );

    return query;
}

export const useUserQuery = (userId: string) => {
    const query = useQuery<{ user: User }>({
        queryKey: ['user', userId],
        queryFn: async () => {
            const response = await fetch(`${environmentVar.BASE_URL}/api/users/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json();
        },
        enabled: false, // Disable auto-fetch
    });
    
    return { ...query, fetchUser: query.refetch }
}