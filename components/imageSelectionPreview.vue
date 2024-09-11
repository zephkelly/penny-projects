<template>
    <div class="image-selection-container">
      <div v-if="!imagePreview" class="no-selection" @click="selectFromImageManager">
        <div class="placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
          <slot></slot>
        </div>
      </div>
      <div v-else class="image-preview-container">
        <div class="wrapper">
          <img 
            :src="imagePreview" 
            alt="Cover image preview" 
            class="preview-image"
          >
          <button class="remove-button" @click.prevent="removeImage">Remove Image</button>
          <button class="remove-button cross" @click.prevent="removeImage">X</button>
          <!-- <div class="arrow-controls">
            <button class="arrow-button up" @click.prevent="moveImage('up')" >
              ▲
            </button>
            <button class="arrow-button down" @click.prevent="moveImage('down')" >
              ▼
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, computed, watch, onMounted, type PropType } from 'vue';
import { useImageManager } from '~/composables/useImageManager';

const { imageManagerPopupOpen, selectImage } = await useImageManager();

const props = defineProps({
    imageUrl: {
        type: String as PropType<string | null>,
        default: null
    }
});

const emit = defineEmits(['image-selected', 'image-removed']);
  
const imagePreview = ref<string | null>(null);
const position = ref(0);
const containerHeight = ref(300);
const imageHeight = ref(0);
  
const minPosition = computed(() => {
    return Math.min(0, containerHeight.value - imageHeight.value);
});

const selectFromImageManager = async () => {
    imageManagerPopupOpen().value = true;
    const image = await selectImage();
    if (image) {
        imagePreview.value = image.url;
        imageHeight.value = image.height;
        resetImagePosition();
        console.log('Image selected', image.url);
        emit('image-selected', image.url);
    }
};

const removeImage = () => {
    imagePreview.value = null;
    resetImagePosition();
    emit('image-removed');
};
  
const resetImagePosition = () => {
    position.value = 0;
};
  
const moveImage = (direction: 'up' | 'down') => {
    const step = 20;
    if (direction === 'up') {
        position.value = Math.min(position.value + step, 0);
    }
    else {   
        position.value = Math.max(position.value - step, minPosition.value);
    }
};
  
watch(() => props.imageUrl, (newValue) => {
    if (newValue) {
        imagePreview.value = newValue;
        resetImagePosition();
    }
});
  
onMounted(() => {
    if (props.imageUrl) {
        imagePreview.value = props.imageUrl;
    }
});
</script>
  
  <style lang="scss" scoped>
  .image-selection-container {
    display: flex;
    height: 400px;
    max-height: 400px;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  
    .no-selection {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      border: 3px dashed var(--admin-transparent);
      color: var(--admin-transparent);
      font-weight: 500;
      font-size: 1.4rem;
      cursor: pointer;
    }
  
    .image-preview-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      border: 1px solid var(--grey3);
      
      &:hover {
        .remove-button, .arrow-controls {
          opacity: 1;
        }
      }
  
      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 8px;
      }
  
      .preview-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
        z-index: 90;
        transition: transform 0.3s ease;
      }
  
      .remove-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: var(--background-color-secondary);
        border: 1px solid rgba(0, 0, 0, 0.25);
        opacity: 0;
        border-radius: 2rem;
        font-size: 1rem;
        padding: 0.5rem 1.2rem;
        transition: background-color 0.1s ease, color 0.1s ease, opacity 0.1s ease;
        cursor: pointer;
  
        &:hover {
          background-color: var(--error);
          color: var(--background-color-secondary);
        }
  
        &.cross {
          background-color: red;
          padding: 5px;
          border-radius: 50%;
          font-size: 1.4rem;
          right: 20px;
          opacity: 0;
        }
      }
  
      .arrow-controls {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        opacity: 0;
        transition: opacity 0.1s ease;
  
        .arrow-button {
          background-color: var(--background-color-secondary);
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin: 5px 0;
          transition: background-color 0.1s ease, color 0.1s ease;
  
          &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.5);
            color: var(--black2);
          }
  
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  </style>