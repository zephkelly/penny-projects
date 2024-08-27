<template>
    <section class="admin-panel">
        <div class="container" v-if="isAdmin">
            <h1>Admin Panel</h1>
        </div>
        <div class="container" v-else>
            <h1>You are not authorised to access this page.</h1>
        </div>
    </section>
</template>

<script lang="ts" setup>
const { isAdmin } = useAuth();
</script>

<style lang="scss" scoped>

</style>