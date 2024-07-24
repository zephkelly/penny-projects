<template>
    <article>
        <div class="group cover">
            <div class="wrapper">
                <img :src="postData?.image" alt="project image"/>
            </div>
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
    border: 1px solid var(--text-color-main);
    border-radius: 8px;
    min-height: 300px;
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

    a {
        padding: 0.5rem 1rem;
        background-color: var(--text-color-main);
        color: white;
        border-radius: 5px;
        text-decoration: none;
    }
}

.group.cover {
    display: flex;
    max-height: 320px;
    background-color: var(--background-color-main-dark);
    
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    
    .wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        img {
            width: 85%;
            height: 80%;
            object-fit: cover;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
        }
    }
}
</style>