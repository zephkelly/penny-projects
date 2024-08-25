<template>
    <div class="carousel">
        <div class="carousel-container" :style="containerStyle" @mouseenter="{ pauseAutoSlide(); pauseControlDisplay(); }" @mouseleave="{ resumeAutoSlide(); resumeControlDisplay(); }" @transitionend="onTransitionEnd">
        <div v-for="(slide, index) in allSlides" :key="`${slide.id}-${index}`" class="carousel-slide">
            <div 
                class="left-panel"
                :style="`background-color: ${slide.dominantColor}`"
                >
                <h2 :style="`color: ${slide.textColor}`">{{ slide.title }}</h2>
                <p>{{ slide.description }}</p>
                </div>
                <div class="right-image">
                    <div 
                        class="fade" 
                        :style="`background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${slide.dominantColor});`">
                    </div>
                    <img :src="slide.image" :alt="slide.alt">
                </div>
            </div>
        </div>
        <button 
            @click="debounce(move(-1), 100)"
            @mouseenter="{ pauseAutoSlide(); pauseControlDisplay(); }" @mouseleave="{ resumeAutoSlide(); resumeControlDisplay(); }"
            class="carousel-control prev"
            :class="{ active: isHovering || isControlVisible }"
            :style="`background-color: ${currentTextColor}`">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </button>
        <button 
            @click="debounce(move(1), 100)"
            @mouseenter="{ pauseAutoSlide(); pauseControlDisplay(); }" @mouseleave="{ resumeAutoSlide(); resumeControlDisplay(); }"
            class="carousel-control next"
            :class="{ active: isHovering || isControlVisible }"
            :style="`background-color: ${currentTextColor}`">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </button>
    </div>
</template>
  
<script setup>
    import { ref, computed, onMounted } from 'vue'
    
    const props = defineProps({
            slides: {
            type: Array,
            required: true
        }
    })
    
    const currentIndex = ref(0)
    const currentDominantColor = computed(() => props.slides[currentIndex.value].dominantColor)
    const currentTextColor = computed(() => props.slides[currentIndex.value].textColor)


    const targetIndex = ref(0)
    const isTransitioning = ref(false)
    const isHovering = ref(false)
    const isControlVisible = ref(false)
    const slideSetCount = ref(1)
    
    const allSlides = computed(() => {
        const slidesWithIds = props.slides.map((slide, index) => ({ ...slide, id: index }))
        return slideSetCount.value === 1 ? slidesWithIds : [...slidesWithIds, ...slidesWithIds]
    })
    
    const containerStyle = computed(() => ({
        transform: `translateX(-${targetIndex.value * 100}%)`,
        transition: isTransitioning.value ? 'transform 0.5s ease' : 'none'
    }))
    
    function move(direction) {
        const newTargetIndex = targetIndex.value + direction

        if (direction === 1 && newTargetIndex >= props.slides.length && slideSetCount.value === 1) {
            slideSetCount.value = 2
        } else if (direction === -1 && newTargetIndex < 0 && slideSetCount.value === 1) {
            slideSetCount.value = 2
            targetIndex.value = props.slides.length + newTargetIndex
        } else {
            targetIndex.value = newTargetIndex
        }

        if (!isTransitioning.value) {
            isTransitioning.value = true
            currentIndex.value = targetIndex.value
        }
    }
  
    function onTransitionEnd() {
        isTransitioning.value = false
        
        if (targetIndex.value >= props.slides.length) {
            targetIndex.value %= props.slides.length
            currentIndex.value = targetIndex.value
            slideSetCount.value = 1
        } else if (targetIndex.value < 0) {
            targetIndex.value = props.slides.length - 1
            currentIndex.value = targetIndex.value
            slideSetCount.value = 1
        }

        if (currentIndex.value !== targetIndex.value) {
            isTransitioning.value = true
        }
    }
    
    let autoSlideInterval;
    const startAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval)
        }

        autoSlideInterval = setInterval(() => {
            if (isHovering.value) return;
            move(1)
        }, 6000)
    }
  
    const pauseAutoSlide = () => {
        clearInterval(autoSlideInterval);
        isHovering.value = true;
    }
    
    const resumeAutoSlide = () => {
        isHovering.value = false;
        startAutoSlide();
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
  
    onMounted(() => {
        startAutoSlide()
    })
</script>
  
<style scoped>
    .carousel {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
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
        opacity: 1;
    }

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }
</style>