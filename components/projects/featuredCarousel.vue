<template>
    <div  class="carousel" :class="{ transitioning: isTransitioning, empty: hasProjects === false }">
        <div v-if="hasProjects === false" class="single-project empty">
            <div class="header">

            </div>
        </div>
        <div v-else-if="projects.length === 1" class="single-project carousel-slide">
            <!-- Single project display -->
            <ProjectsCarouselSlide :project="projects[0]" />
        </div>
        <template v-else>
            <div class="carousel-container" 
                :style="containerStyle" 
                @mouseenter="pauseAutoSlide"
                @mouseleave="resumeAutoSlide"
                @transitionend="onTransitionEnd"
            >
                <!-- Clone of last slide -->
                <div>
                    <ProjectsCarouselSlide :project="projects[projects.length - 1]" />
                    <!-- Original slides -->
                    <ProjectsCarouselSlide v-for="(project, index) in projects" :project="project" :key="`${project.project_id}-${index}`" />
                    <!-- Clone of first slide -->
                    <ProjectsCarouselSlide :project="projects[0]" />
                </div>
            </div>
            <div>
                <button @click="navigate(-1)"
                        @mouseenter="pauseControlDisplay"
                        @mouseleave="resumeControlDisplay"
                        class="carousel-control prev left"
                        :style="{ 'border-color': currentMainColor, 'color': currentMainColor }"
                        :class="{ active: isControlVisible, hovering: isHovering }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </button>
                <button @click="navigate(1)"
                        @mouseenter="pauseControlDisplay"
                        @mouseleave="resumeControlDisplay"
                        class="carousel-control next"
                        :class="[{ active: isControlVisible, hovering: isHovering }, currentContrastColor]"
                        :style="{ 'border-color': currentMainColor, 'color': currentMainColor }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                </button>
            </div>
        </template>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, computed, onMounted, nextTick } from 'vue'
    import { type FrontendProject } from '~/types/database';
    
    const props = defineProps<{
        projects: FrontendProject[]
    }>();

    
    const currentIndex = ref(0)
    const isTransitioning = ref(false)
    const isHovering = ref(false)
    const isControlVisible = ref(false)
    const hasProjects = computed(() => props.projects.length > 0)
    console.log(hasProjects.value)
    
    const containerStyle = computed(() => ({
        transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
        transition: isTransitioning.value ? 'transform 0.6s cubic-bezier(.23,.29,0,1)' : 'none'
    }))

    const currentMainColor = computed(() => {
        return props.projects[normalizeIndex(currentIndex.value)].cover_colour_main;
    })
    
    const currentContrastColor = computed(() => {
        return props.projects.length > 1 ? props.projects[normalizeIndex(currentIndex.value)].cover_colour_contrast === 'rgb(22, 22, 22)' ? 'dark' : 'light' : 'dark'
    })
    
    function normalizeIndex(index: number) {
        return (index + props.projects.length) % props.projects.length
    }
    
    function navigate(direction: number) {
        if (props.projects.length <= 1) return;
        move(direction);
        startAutoSlide();
    }
    
    function move(direction: number) {
        if (isTransitioning.value || props.projects.length <= 1) return;
    
        isTransitioning.value = true;
        currentIndex.value += direction;
    }
    
    async function onTransitionEnd() {
        if (currentIndex.value === -1) {
        await snapToSlide(props.projects.length - 1)
        } else if (currentIndex.value === props.projects.length) {
        await snapToSlide(0)
        }
        
        isTransitioning.value = false
    }
    
    async function snapToSlide(index: number) {
        isTransitioning.value = false
        await nextTick()
        currentIndex.value = index
    }
    
    let controlsDisplayInterval: any;
    const startControlDisplay = () => {
        if (controlsDisplayInterval) {
        clearInterval(controlsDisplayInterval)
        }
    
        controlsDisplayInterval = setInterval(() => {
        isControlVisible.value = false;
        }, 2000)
    }
    
    const pauseControlDisplay = () => {
        clearInterval(controlsDisplayInterval);
        isControlVisible.value = true;
    }
    
    const resumeControlDisplay = () => {
        startControlDisplay();
    }
    
    let autoSlideInterval: any;
    function startAutoSlide() {
        if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
        }
    
        if (props.projects.length <= 1) return;
    
        autoSlideInterval = setInterval(() => {
        if (isHovering.value) return;
        move(1);
        }, 6000)
    }
    
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval)
        isHovering.value = true
    }
    
    function resumeAutoSlide() {
        isHovering.value = false
        startAutoSlide()
    }
    
    onMounted(() => {
        if (props.projects.length > 1) {
        startAutoSlide()
        startControlDisplay()
        }
    })
</script>

<style lang="scss">
.carousel {
    &.transitioning {
        .carousel-slide {
            .left-panel {
                transition: none;
            }
    
            .right-image {
                transition: none;
    
                img {
                    transition: none;
                }
            }
        }
    }
    
    &:hover:not(.transitioning) {
        .carousel-slide {
            .left-panel {
                width: 59.5%;
            }
    
            .right-image {
                width: 40.5%;

                img {
                    transform: scale(1.02);
                }
            }
        }
    }
}
</style>
  
<style lang="scss" scoped>
    .carousel {
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: 12px;

        &.empty {
            overflow: visible;
        }

        * {
            box-sizing: border-box;
        }
    }
  
    .carousel-container {
        display: flex;
        height: 100%;
    }

    .carousel-control {
        position: absolute;
        bottom: 0.5rem;
        
        border: none;
        padding: 10px;
        margin: 0.95rem;
        margin-bottom: 0.75rem;
        cursor: pointer;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        will-change: opacity;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
        will-change: background-color, color, border-color, opacity;
        border: 1px solid var(--black2);
        color: var(--black2);
        background-color: var(--background-color-main);
    }

    .carousel-control svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }

    .carousel-control.active {
        opacity: 1;

        &:hover {
            opacity: 0.75;
        }
    }

    .carousel-control.hovering {
        opacity: 1;
    }

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }

    .empty-carousel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: var(--background-color-secondary);
    }

    .single-project.empty {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        background-color: var(--background-color-secondary);
        border-radius: 12px;
        box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.05);
        padding: 2rem;

        .header {
            height: 1.9rem;
            width: 50%;
            background-color: var(--grey7);
            border-radius: 6px;
        }
    }
</style>