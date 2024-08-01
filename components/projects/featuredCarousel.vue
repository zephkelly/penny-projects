<template>
    <div class="carousel">
      <div class="carousel-container" :style="containerStyle" @mouseenter="pauseAutoSlide" @mouseleave="resumeAutoSlide">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
          <img :src="slide.image" :alt="slide.alt">
        </div>
      </div>
      <button @click="prev & resetAutoSlideTimer()" class="carousel-control prev">&lt;</button>
      <button @click="next & resetAutoSlideTimer()" class="carousel-control next">&gt;</button>
    </div>
  </template>
  
<script setup>
    import { ref, computed } from 'vue'
    
    const props = defineProps({
        slides: {
            type: Array,
            required: true
        }
    })
  
    const currentIndex = ref(0)
    const isHovering = ref(false)
    const autoSlideInterval = ref(null)
    const manualSlidePauseTimeout = ref(null)
    
    const containerStyle = computed(() => ({
        transform: `translateX(-${currentIndex.value * 100}%)`
    }))
    
    function next() {
        currentIndex.value = (currentIndex.value + 1) % props.slides.length
    }
    
    function prev() {
        currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
    }

    function pauseAutoSlide() {
        isHovering.value = true
    }

    function resumeAutoSlide() {
        isHovering.value = false
        startAutoSlide()
    }

    function startAutoSlide() {
        if (autoSlideInterval.value) clearInterval(autoSlideInterval.value)
        autoSlideInterval.value = setInterval(() => {
            if (!isHovering.value) {
                next()
            }
        }, 6000)
    }

    function resetAutoSlideTimer() {
        if (manualSlidePauseTimeout.value) clearTimeout(manualSlidePauseTimeout.value)
        if (autoSlideInterval.value) clearInterval(autoSlideInterval.value)
        
        manualSlidePauseTimeout.value = setTimeout(() => {
            startAutoSlide()
        }, 12000)
    }

    onMounted(() => {
        startAutoSlide()
    })
</script>
  
  <style scoped>
  .carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .carousel-container {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .carousel-slide {
    flex: 0 0 100%;
  }
  
  .carousel-slide img {
    width: 100%;
    height: auto;
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  </style>