import type { Status }from '@/types/status'

export const useAuth = () => {
    const isAdmin = useState('isAdmin', () => false);
    const isLoggedIn = useState('isLoggedIn', () => false);

    const getProfileImage = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);
            const response = await $fetch('/api/auth/profile-image', { headers, credentials: 'include', lazy: true, server: false });

            if (response === undefined || response.data === null) return;

            //@ts-expect-error
            return response.data.profileImage;
        } 
        catch (error) {
            console.error('Error getting profile image:', error)
        }
    }

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
        getProfileImage,
        logout
    }
}