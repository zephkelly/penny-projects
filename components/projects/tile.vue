<template>
    <article>
        <div class="group cover">
            <img :src="postData?.image" alt="project image"/>
        </div>
        <div class="group content">
            <h3>{{ postData?.title }}</h3>
            <p>{{ postData?.description }}</p>
            <NuxtLink :to="postData?.link">Read more</NuxtLink>
        </div>
    </article>
</template>

<script setup lang="ts">
//define props

defineProps({
    postData: Object
})
</script>

<style lang="scss" scoped>
article {
    display: flex;
    flex-direction: column;
    // padding: 1rem;
    border: 1px solid var(--text-color-main);
    border-radius: 5px;
    min-height: 300px;

    .group.cover {
        min-height: 320px;
    }

    .group.content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-top: 1px solid var(--text-color-main);
        padding: 1rem;
        padding-top: 0rem;
        padding-bottom: 1rem;
        box-sizing: border-box;
        height: 40%;
        min-height: 140px;
    }

    h3 {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        color: var(--text-color-main);
    }

    p {
        margin-bottom: 1rem;
        color: var(--text-color-main);
        margin-bottom: 6rem;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-bottom: 1rem;
    }

    a {
        padding: 0.5rem 1rem;
        background-color: var(--text-color-main);
        color: white;
        border-radius: 5px;
        text-decoration: none;
    }
}
</style>