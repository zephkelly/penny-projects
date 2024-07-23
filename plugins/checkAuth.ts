export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.client) {
        nuxtApp.hook('app:created', async () => {
            const { checkAuthStatus } = useAuth()
            await checkAuthStatus()
        })
    
        nuxtApp.hook('page:start', async () => {
            const { checkAuthStatus, isAdmin } = useAuth()
            await checkAuthStatus()
        })
      }
})