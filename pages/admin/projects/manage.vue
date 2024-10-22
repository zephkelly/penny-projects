<template>
    <section class="manage-projects component">
        <div class="container">
            <h1 class="header admin">Manage Projects</h1>
            <div class="featured-projects">
                <h2 class="sub-header">Featured Projects</h2>
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
    margin-bottom: 1rem;

}

.header {
    color: var(--admin);
    margin-bottom: 3rem;
}

.admin {
    color: var(--admin);
}
</style>