<template>
    <div class="carousel-slide" v-is="project">
        <div class="left-panel" :style="`border: 1px solid ${project.cover_colour_main};`">
            <div class="title-section">
                <h2>{{ project.title }}</h2>
                <p class="subtitle">{{ project.subtitle }}</p>
            </div>
            <div class="info-bar">
                <div class="author-image-container">
                    <img :src="`${project.author_image_url as string}`" loading="eager" />
                </div>
                <div class="status-list">
                    <button class="project-status-label" :class="status" type="button" >
                        {{ formatStatusName(status) }}
                    </button>
                </div>
            </div>
        </div>
        <div class="right-image" :style="`border: 1px solid ${project.cover_colour_main}; border-left: none;`">
            <img :src="project.cover_image_url" loading="eager">
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { type FrontendProject } from '~/types/database';

    const props = defineProps<{
        project: FrontendProject
    }>();

    const formatStatusName = (status: string) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    //@ts-ignore
    const status = ref<string>(props.project?.status);
</script>

<style lang="scss" scoped>
.carousel-slide {
    display: flex;
    height: 100%;
    flex: 0 0 100%;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
}
  
.left-panel {
    width: 60%;
    padding: 4rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    transition: width 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    will-change: width;
}

.right-image {
    width: 40%;
    overflow: hidden;
    position: relative;
    right: 0;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    transition: width 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    will-change: width;
}

.right-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    transition: transform 1.2s cubic-bezier(0.23, 0.29, 0, 1);
}

.project-status-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    text-align: center;
    padding: 0.4rem 0.8rem;
    width: auto;
    border-radius: 8px;

    &.completed, &.finished {
        background-color: #4987102b;
        border: 1px solid #456825de;
        color: #39651fd1;
    }

    &.in-progress {
        background-color: #388bc735;
        border: 1px solid #3068a8de;
        color: #3364a8d1;
    }

    &.ongoing {
        background-color: #1e9eff26;
        border: 1px solid #116db4c7;
        color: #1165a9bc;
    }

    &.active {
        background-color: #0eadb62a;
        border: 1px solid #0d8d86ad;
        color: #0c7684be;
    }
    
    &.pending {
        background-color: #b8681825;
        border: 1px solid #c2710fdb;
        color: #a76413ca;
    }

    &.proposed {
        background-color: #7318b825;
        border: 1px solid #6b28b8a9;
        color: #6f1aa19a;
    }
    
    &.archived, &.draft {
        background-color: #40404025;
        border: 1px solid #545454db;
        color: #3b3b3bca;
    }

    &.cancelled {
        background-color: #ab351815;
        border: 1px solid #8e351fd2;
        color: #8e351fd0;
    }
}

.title-section {
    margin-bottom: 1.5rem;

    h2 {
        font-family: "Poppins", "Inter", sans-serif;
        font-weight: 600;
        font-size: 1.9rem;
        margin-bottom: 10px;
        line-height: 32px;
        color: var(--black2);
    }
}

.info-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .subtitle {
        font-size: 1rem;
        font-weight: 400;
        color: var(--black2);
        margin-bottom: 1rem;
    }

    .author-image-container {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid var(--black2);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>