<template>
    <div v-if="projects.length > 0" class="carousel">
      <div v-if="projects.length === 1" class="single-project carousel-slide">
        <!-- Single project display -->
        <div class="left-panel" :style="`background-color: ${projects[0].cover_colour_main}`">
          <h2 :style="`color: ${projects[0].cover_colour_contrast}`">{{ projects[0].title }}</h2>
          <p>{{ projects[0].subtitle }}</p>
        </div>
        <div class="right-image">
          <div class="fade" :style="`background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${projects[0].cover_colour_main});`"></div>
          <img :src="projects[0].cover_image_url" loading="eager">
        </div>
      </div>
      <template v-else>
        <div class="carousel-container" 
             :style="containerStyle" 
             @mouseenter="pauseAutoSlide"
             @mouseleave="resumeAutoSlide"
             @transitionend="onTransitionEnd">
          <!-- Clone of last slide -->
          <div class="carousel-slide">
            <div class="left-panel" :style="`background-color: ${projects[projects.length - 1].cover_colour_main}`">
              <h2 :style="`color: ${projects[projects.length - 1].cover_colour_contrast}`">{{ projects[projects.length - 1].title }}</h2>
              <p>{{ projects[projects.length - 1].subtitle }}</p>
            </div>
            <div class="right-image">
              <div class="fade" :style="`background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${projects[projects.length - 1].cover_colour_main});`"></div>
              <img :src="projects[projects.length - 1].cover_image_url" loading="eager">
            </div>
          </div>
          <!-- Original slides -->
          <div v-for="(project, index) in projects" :key="`${project.project_id}-${index}`" class="carousel-slide">
            <div class="left-panel" :style="`background-color: ${project.cover_colour_main}`">
              <h2 :style="`color: ${project.cover_colour_contrast}`">{{ project.title }}</h2>
              <p>{{ project.subtitle }}</p>
            </div>
            <div class="right-image">
              <div class="fade" :style="`background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${project.cover_colour_main});`"></div>
              <img :src="project.cover_image_url" loading="eager">
            </div>
          </div>
          <!-- Clone of first slide -->
          <div class="carousel-slide">
            <div class="left-panel" :style="`background-color: ${projects[0].cover_colour_main}`">
              <h2 :style="`color: ${projects[0].cover_colour_contrast}`">{{ projects[0].title }}</h2>
              <p>{{ projects[0].subtitle }}</p>
            </div>
            <div class="right-image">
              <div class="fade" :style="`background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${projects[0].cover_colour_main});`"></div>
              <img :src="projects[0].cover_image_url" loading="eager">
            </div>
          </div>
        </div>
        <button @click="navigate(-1)"
                @mouseenter="pauseControlDisplay"
                @mouseleave="resumeControlDisplay"
                class="carousel-control prev"
                :class="{ active: isControlVisible, hovering: isHovering }"
                :style="`background-color: ${currentTextColor}`">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </button>
        <button @click="navigate(1)"
                @mouseenter="pauseControlDisplay"
                @mouseleave="resumeControlDisplay"
                class="carousel-control next"
                :class="{ active: isControlVisible, hovering: isHovering }"
                :style="`background-color: ${currentTextColor}`">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </button>
      </template>
    </div>
    <div v-else class="no-projects">
      No projects available
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
  
  const containerStyle = computed(() => ({
    transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
    transition: isTransitioning.value ? 'transform 0.6s cubic-bezier(.23,.29,0,1)' : 'none'
  }))
  
  const currentTextColor = computed(() => 
    props.projects.length > 1 ? props.projects[normalizeIndex(currentIndex.value)].cover_colour_contrast : ''
  )
  
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
  
<style lang="scss" scoped>
    .carousel {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: 12px;
    }
  
    .carousel-container {
        display: flex;
        height: 100%;
    }

    .carousel-slide {
        display: flex;
        height: 100%;
        flex: 0 0 100%;
        cursor: pointer;
    }

    .carousel-slide {
        
    }
  
    .left-panel {
        flex: 0 0 40%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }

    .left-panel h2 {
        font-family: "Poppins", "Inter", sans-serif;
        font-weight: 600;
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .right-image {
        flex: 0 0 60%;
        overflow: hidden;
        position: relative;
    }


    .right-image .fade {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
    }

    .right-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: translateX(-40px);
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
    }

    .carousel-control {
        position: absolute;
        bottom: 1rem;
        color: white;
        border: none;
        padding: 10px;
        margin: 1rem;
        margin-bottom: 0.8rem;
        cursor: pointer;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .carousel-control svg {
        width: 100%;
        height: 100%;
    }

    .carousel-control.active {
        opacity: 0.75;

        &:hover {
            opacity: 1;
        }
    }

    .carousel-control.hovering {
        opacity: 0.75;
    }

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }
</style>