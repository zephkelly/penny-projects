<template>
    <div class="carousel">
      <div class="carousel-container" 
           :style="containerStyle" 
           @mouseenter="{ pauseAutoSlide(); pauseControlDisplay(); }"
           @mouseleave="{ resumeAutoSlide(); resumeControlDisplay(); }"
           @transitionend="onTransitionEnd">
        <div v-for="(slide, index) in displayedSlides" :key="`${slide.id}-${index}`" class="carousel-slide">
          <div class="left-panel" :style="`background-color: ${slide.dominantColor}`">
            <h2 :style="`color: ${slide.textColor}`">{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
          <div class="right-image">
            <div class="fade" :style="`background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${slide.dominantColor});`"></div>
            <img :src="slide.image" :alt="slide.alt" loading="eager">
          </div>
        </div>
      </div>
      <button @click="navigate(-1)"
              @mouseenter="{ pauseAutoSlide(); pauseControlDisplay(); }"
              @mouseleave="{ resumeAutoSlide(); resumeControlDisplay(); }"
              class="carousel-control prev"
              :class="{ active: isControlVisible }"
              :style="`background-color: ${currentTextColor}`">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
      </button>
      <button @click="navigate(1)"
              @mouseenter="{ pauseAutoSlide(); pauseControlDisplay(); }"
              @mouseleave="{ resumeAutoSlide(); resumeControlDisplay(); }"
              class="carousel-control next"
              :class="{ active: isControlVisible }"
              :style="`background-color: ${currentTextColor}`">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
      </button>
    </div>
  </template>
  
<script setup>
    import { ref, computed, onMounted, nextTick } from 'vue'
    
    const props = defineProps({
        slides: {
        type: Array,
        required: true
        }
    })
    
    const currentIndex = ref(0)
    const isTransitioning = ref(false)
    const isHovering = ref(false)
    const isControlVisible = ref(false)
    const wasHovering = ref(false)
    
    const displayedSlides = computed(() => {
        const slidesWithIds = props.slides.map((slide, index) => ({ ...slide, id: index }))
        return [...slidesWithIds.slice(-1), ...slidesWithIds, ...slidesWithIds.slice(0, 1)]
    })
    
    const containerStyle = computed(() => ({
        transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
        transition: isTransitioning.value ? 'transform 0.6s cubic-bezier(.23,.29,0,1)' : 'none'
    }))
    
    const currentTextColor = computed(() => props.slides[normalizeIndex(currentIndex.value)].textColor)
  
    function normalizeIndex(index) {
        return (index + props.slides.length) % props.slides.length
    }

    function navigate(direction) {
        move(direction);
        startAutoSlide();
    }
  
    function move(direction) {
        if (isTransitioning.value) return

        isTransitioning.value = true;

        wasHovering.value = isHovering.value;
        isHovering.value = false;

        currentIndex.value += direction
    }
    
    async function onTransitionEnd() {
        if (currentIndex.value === -1) {
            await snapToSlide(props.slides.length - 1)
        } else if (currentIndex.value === props.slides.length) {
            await snapToSlide(0)
        }

        if (wasHovering.value) {
            isHovering.value = true;
        }
        
        isTransitioning.value = false
    }
    
    async function snapToSlide(index) {
        isTransitioning.value = false
        await nextTick()
        currentIndex.value = index
    }

    let controlsDisplayInterval;
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

    let autoSlideInterval
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval)
        }

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
        startAutoSlide()
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

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }
</style>