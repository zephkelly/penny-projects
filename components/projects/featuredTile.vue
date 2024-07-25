<template>
    <article>
        <div class="group cover">
            <div class="wrapper">
                <img :src="postData?.image" alt="project image"/>
            </div>
        </div>
        <div class="group content">
            <span class="status" :class="postData?.status">{{ postData?.status }}</span>
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
    font-family: 'Poppins', sans-serif;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid var(--text-color-main);
    padding: 1rem;
    padding-top: 0rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
    height: 40%;
    min-height: 140px;
    max-height: 200px;
    
    h3 {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        color: var(--text-color-main);
    }

    p {
        margin-bottom: 1rem;
        color: var(--text-color-main);
        margin-bottom: 1rem;
    }

    a {
        text-align: center;
        padding: 0.5rem 1rem;
        background-color: var(--text-color-main);
        color: white;
        width: 6rem;
        border-radius: 5px;
        text-decoration: none;
    }
}

.group.cover {
    display: flex;
    max-height: 250px;
    min-height: 200px;
    background-color: var(--background-color-main-dark);
    
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    
    .wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
    }
}

.status {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    position: absolute;
    text-align: center;
    top: 1.5rem;
    right: 1rem;
    padding: 0.3rem 0.6rem;
    width: auto;
    border-radius: 8px;
    color: var(--white-transparent);

    &::first-letter {
        text-transform: uppercase;
    }

    &.completed {
        width: 4.6rem;
        background-color: #ab351815;
        border: 1px solid #8e351fca;
        color: #8e351fca;
    }

    &.ongoing {
        width: 3.6rem;
        background-color: #6d83582c;
        border: 1px solid #4c6a30de;
        color: #4c6a30d1;
    }

    &.proposed {
        width: 4.1rem;
        background-color: #ab621815;
        border: 1px solid #a35210d3;
        color: #a35210d3;
    }
}
</style>