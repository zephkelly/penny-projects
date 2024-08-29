import type { Status }from '@/types/status'

export const useAuth = () => {
    const isAdmin = useState('isAdmin', () => false);
    const isLoggedIn = useState('isLoggedIn', () => false);

    const checkAuthStatus = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);
            let status: Status = {
                isLoggedIn: false,
                isAdmin: false
            };

            // if (import.meta.client) {
            const response = await $fetch('/api/auth/status', { headers, credentials: 'include', lazy: true, server: false });

            if (response === undefined || response.data === null) return;

            status = {
                isLoggedIn: response.data.isLoggedIn,
                isAdmin: response.data.isAdmin
            }

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

    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' })

            isLoggedIn.value = false
            isAdmin.value = false
        } 
        catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return {
        isLoggedIn,
        isAdmin,
        checkAuthStatus,
        logout
    }
}