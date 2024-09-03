export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isAdmin, checkAuthStatus } = useAuth()
    
    await checkAuthStatus()
    
    if (isAdmin.value === false) {
        const fromPath = from.path

        if (fromPath === '/login') {
            return navigateTo('/')
        }

        return navigateTo('/login?redirect=' + fromPath)
    }
})