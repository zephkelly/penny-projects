<template>
    <section class="manage-projects component">
        <div class="container">
            <h1 class="header admin">Manage Projects</h1>
            <div class="featured-projects">
                <div class="title-header">
                    <h2 class="sub-header">Featured Projects</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
                </div>
                <div class="projects">
                    <div v-for="project in projects">
                        <!-- <ProjectCard :project="project" /> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const projects = ref([]);

//$fetch all projects from /api/project
const response = await useFetch('/api/project?unpublished=true', {
    method: 'GET'
});

console.log(response);
</script>

<style lang="scss" scoped>
section {
    min-height: 600px;
    display: flex;
    justify-content: center;
    padding: 0rem 1rem 0rem 1rem;
    height: 1000px;
    background-color: var(--background-color);

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 14rem;

        @media (max-width: 768px) {
            margin-top: 10rem;
        }
    }
}

.sub-header {
    font-family: 'Nunito', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.15rem;
    font-weight: 700;
    color: var(--admin-dark);
    text-transform: uppercase;
    text-align: center;
}

.header {
    color: var(--admin);
    margin-bottom: 3rem;
}

.admin {
    color: var(--admin);
}

.title-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    svg {
        fill: var(--admin-dark);
        margin-left: 1rem;
        cursor: pointer;
    }
}
</style>