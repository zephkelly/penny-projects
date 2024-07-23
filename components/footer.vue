<template>
    <footer class="footer">
        <p class="email">thepennyprojects@gmail.com</p>
        <p class="address">Kafue, Zambia</p>
    </footer>
    <ClientOnly v-if="isOnLoginPage === false">
        <NuxtLink to="/login" class="admin-login" v-if="isLoggedIn === false">Admin Portal</NuxtLink>
        <NuxtLink class="admin-login" v-else @click="signOut">Log out</NuxtLink>
    </ClientOnly>
</template>

<script setup lang="ts">
const { isLoggedIn, logout } = useAuth()

const route = useRoute()
const isOnLoginPage = computed(() => route.path === '/login')

// onMounted(async () => {
//     await checkAuthStatus()
// })

const signOut = async () => {
    try {
        await logout()
        await navigateTo('/?toast=Logged out successfully.')
    } catch (error) {
        console.error('Error signing out:', error)
    }
}
</script>

<style scoped lang="scss">
footer {
    height: 100px;
    background-color: var(--background-color-main);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6.5rem;
    font-size: 1.2rem;
    margin-top: 4rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 3rem;
        font-size: 1.2rem;
        height: auto;
    }
}

p, a {
    font-family: 'Poppins', sans-serif;
    color: var(--text-color-main);
}

.admin-login {
    color: var(--text-color-main);
    display: block;
    width: 100%;
    font-size: 0.8rem;
    margin: 2rem;
    margin-top: 0rem;
    cursor: pointer;
}
</style>