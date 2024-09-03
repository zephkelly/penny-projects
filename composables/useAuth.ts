import type { Status }from '@/types/status'
import type { User } from '@/types/database'

export const useAuth = () => {
    const user = useState('user', () => null);
    const isAdmin = useState('isAdmin', () => false);
    const isLoggedIn = useState('isLoggedIn', () => false);

    const checkAuthStatus = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);

            let status: Status = {
                isLoggedIn: false,
                isAdmin: false
            };

            const response = await $fetch('/api/auth/status', { headers, credentials: 'include', lazy: true, server: false });

            if (response === undefined) return;

            status = response.data;

            if (status === null) return;
            isLoggedIn.value = status.isLoggedIn;
            isAdmin.value = status.isAdmin;
        } 
        catch (error) {
            console.error('Error checking auth status:', error)
            isLoggedIn.value = false
            isAdmin.value = false
        }
    }

    const getUserInfo = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);
            const response = await $fetch<User>('/api/auth/user-info', { headers, credentials: 'include' });

            if (response === undefined || response === null) return;

            const user: User = response;
            return user;
        } 
        catch (error) {
            console.error('Error getting user info:', error)
            return null;
        }
    }

    // const login = async (credentials: any) => {
    //     try {
    //         const { data } = await useFetch('/api/auth/login', {
    //             method: 'POST',
    //             body: credentials
    //         })
    //         user.value = data.value?.user || null
    //         return true
    //     }
    //     catch (error) {
    //         return false
    //     }
    // }

    const logout = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);
            await $fetch('/api/auth/logout', { headers, credentials: 'include', method: 'POST' })

            user.value = null;
            isLoggedIn.value = false;
            isAdmin.value = false;
        } 
        catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return {
        user,
        isLoggedIn,
        isAdmin,
        checkAuthStatus,
        getUserInfo,
        logout
    }
}