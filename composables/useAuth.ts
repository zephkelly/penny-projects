export const useAuth = () => {
    const isAdmin = useState('isAdmin', () => false);
    // const isAdmin = ref(isAdminState.value);
    const isLoggedIn = useState('isLoggedIn', () => false);

    const checkAuthStatus = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);
            
            let data: any;
            
            // if (import.meta.client) {
            //     const { data: fetchedData } = await useFetch('/api/auth/status', { headers, lazy: true, server: false })
            //     data = fetchedData      
            // }
            // else {
                const { data: fetchedData } = await useFetch('/api/auth/status', { headers })
                data = fetchedData
            // }
            
            if (data.value && data.value.data) {
                isLoggedIn.value = data.value.data.isLoggedIn
                isAdmin.value = data.value.data.isAdmin;
            }
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