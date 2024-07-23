export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isAdmin, checkAuthStatus } = useAuth()
    
    await checkAuthStatus()
    
    if (!isAdmin.value) {
        const fromPath = from.path
        return navigateTo('/login?redirect=' + fromPath)
    }
  })