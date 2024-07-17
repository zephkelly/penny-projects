<template>
    <section id="adminHero" v-if="isAdmin">
        <div class="container">
            <h2 class="sub-header">Hi Joel,</h2>
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
  await checkAuthStatus()
  isCheckingAuth.value = false
})
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 1000px;
    background-color: var(--background-color-secondary);

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 14rem;
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