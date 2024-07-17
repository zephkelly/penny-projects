<template>
    <div v-if="isAdmin">
        <h1>Edit Projects</h1>
    </div>
    <div v-else-if="isCheckingAuth">
        <h1>Checking Auth Status...</h1>
    </div>
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

<style lang="scss">
</style>