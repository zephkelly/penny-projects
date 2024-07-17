export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isAdmin, checkAuthStatus } = useAuth()
    
    await checkAuthStatus()
    
    if (!isAdmin.value) {
      return navigateTo('/login')
    }
  })