<template>
    <article class="project featured">
        <div class="group cover">
            <span class="tag" :class="postData?.status">{{ postData?.status }}</span>
            <div class="wrapper">
                <img :src="postData?.image" alt="project image"/>
            </div>
        </div>
        <div class="group content">
            <h3>{{ postData?.title }}</h3>
            <h4>{{ postData?.description }}</h4>
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
    overflow: hidden;
}

.group.content {
    font-family: 'Poppins', sans-serif;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid var(--text-color-main);
    // background-color: var(--background-color-secondary);
    padding: 1rem;
    padding-top: 0rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
    flex: 1;
    min-height: 140px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    
    h3 {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        color: var(--text-color-main);
    }

    h4 {
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
    position: relative;
    max-height: 250px;
    min-height: 200px;
    // background-color: var(--background-color-main-dark);
    
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    
    .wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        //padding: 0rem 2rem;
        // padding-top: 3rem;
        overflow: hidden;
        
        img {
            border-top: 1px solid var(--main);
            width: 100%;
            height: 100%;
            object-fit: cover;
            // border-top-left-radius: 8px;
            // border-top-right-radius: 8px;
        }
    }
}

.tag {
    position: absolute;
    top: 1rem;
    right: 2rem;
    background-color: var(--background-color-main);
}
</style>