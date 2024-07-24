<template>
    <section class="tileset">
        <div class="container featured">
            <h2>Featured Projects</h2>
            <div class="group">
                <ProjectTile :postData="data[i-1]" v-for="i in 3"/>
            </div>
        </div>
        <div class="container latest">
            <div class="group">
                <ProjectTile :postData="data[i]" v-for="i in data.length"/>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import ProjectTile from '@/components/projects/tile.vue';

//data object with 3 posts
const data = [
    {
        title: 'Project 1',
        description: 'This is a description of project 1',
        image: '',
        link: '/'
    },
    {
        title: 'Project 2',
        description: 'This is a description of project 2',
        image: '',
        link: '/'
    },
    {
        title: 'Project 3',
        description: 'This is a description of project 3',
        image: '/images/instaFeed1.webp',
        link: '/'
    },
    {
        title: 'Project 4',
        description: 'This is a description of project 4',
        image: '',
        link: '/'
    }
];
</script>

<style lang="scss" scoped>
.tileset {
    flex-direction: column;
}

.container {
    flex-direction: column;
    margin-top: 4rem;
    margin-bottom: 6rem;

    > .group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        box-sizing: border-box;
        gap: 2rem;
    }
}

h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-color-main);
}
</style>
