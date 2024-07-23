<template>
    <section class="projects component">
        <div class="container">
            <h1 class="header">Our Projects</h1>
            <p class="subheader">We believe that small actions can lead to big changes. Our projects, both ongoing and completed, demonstrate the collective power of people like you. Read more about our work below.</p>
            <ProjectTileset />
            <ClientOnly>
                <lazyAdminPanel v-if="isAdmin" />
            </ClientOnly>
        </div>
    </section>
</template>

<script setup lang="ts">
import ProjectTileset from '~/components/projects/tileset.vue';
import LazyAdminPanel from '~/components/projects/lazyAdminPanel.vue';

const { isAdmin } = useAuth();
</script>

<style lang="scss" scoped>
section {
    min-height: 500px;

    .container {
        margin-top: 14rem;
        flex-direction: column;
    }
}

.subheader {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-main);
    margin-bottom: 1rem;
    margin-top: 1.5rem;
}

</style>