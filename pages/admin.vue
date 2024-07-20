<template>
    <section id="adminHero" v-if="isAdmin && isCheckingAuth === false">
        <div class="container">
            <h1 class="header">Admin Panel</h1>
            
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['admin']
})

const { isAdmin, checkAuthStatus } = useAuth()
const isCheckingAuth = ref(true)

onMounted(async () => {
    isCheckingAuth.value = true;
  await checkAuthStatus()
  isCheckingAuth.value = false
})
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    padding: 0rem 1rem 0rem 1rem;
    height: 1000px;
    background-color: var(--background-color-secondary);

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 10rem;
    }
}

.sub-header {
    font-family: 'Nunito', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.3rem;
    font-weight: 700;
    color: var(--text-color-main);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1rem;

}

.header {
    font-family: 'Nunito', sans-serif;
    font-size: 3rem;
    letter-spacing: 0.3rem;
    font-weight: 700;
    color: var(--text-color-main);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 2rem;
}
</style>