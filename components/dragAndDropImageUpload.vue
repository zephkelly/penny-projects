<template>
    <div class="image-upload-container" :class="{ 'flex-to-parent': isFlexToParent }">
        <div v-if="!imagePreview" 
            class="drag-drop-zone"
            @drag.prevent
            @dragstart.prevent
            @dragend.prevent
            @dragover.prevent
            @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': isDragging, 'showing-preview': imagePreview, 'flex-to-parent': isFlexToParent }"
            @click="debounceTriggerFileInput"
            >
                
            <div class="placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                <p v-if="!isFlexToParent">Drag and drop your cover image here or click to select</p>
            </div>
        </div>
        <input v-if="!imagePreview"
            type="file"
            ref="fileInput"
            @change="handleFileInput"
            accept="image/*"
            class="file-input"
        >
        <div v-else class="image-preview-container" :class="{ 'flex-to-parent': isFlexToParent }">
            <div class="wrapper" >
                <img :src="imagePreview" alt="Cover image preview" class="preview-image">
                <button v-if="!isFlexToParent" @click="removeImage" class="remove-button">Remove Image</button>
                <button v-else @click="removeImage" class="remove-button cross">X</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        flexToParent: {
            type: Boolean,
            default: false
        }
    });

    const isFlexToParent = ref(props.flexToParent);
    
    const emit = defineEmits(['image-selected', 'image-removed']);
    
    const isDragging = ref(false);
    const imagePreview = ref(null);
    const fileInput = ref(null);
    
    const handleDrop = (e) => {
        isDragging.value = false;
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    };
    
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    };
    
    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
            emit('image-selected', file);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        console.log('triggering file input');
        fileInput.value.click();
    };

    const debounceTriggerFileInput = debounce(triggerFileInput, 100);
    
    const removeImage = () => {
        imagePreview.value = null;
        if (fileInput.value) {
            fileInput.value.value = '';
        }
        emit('image-removed');
    };
</script>
  
<style lang="scss" scoped>
.image-upload-container {
    width: 100%;
    height: 400px;
    max-height: 400px;

    &.flex-to-parent {
        display: flex;
        flex: 1;
        height: 100%;
    }
    
    * {
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
}

.image-preview-container {
    position: relative;
    width: 100%;
    border-radius: 8px;
    height: 90%;
    max-height: 400px;

    &.flex-to-parent {
        height: 100%;

        .wrapper {
            padding: 0rem;
            height: 100%;

            .preview-image {
                width: 100%;
                height: 100%;
            }
        }

        .remove-button {
            bottom: 1rem;
            opacity: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &:hover {
        .remove-button {
            opacity: 1;
        }
    }
}

  
.drag-drop-zone {
    border: 2px dashed var(--admin-transparent);
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.flex-to-parent {
        height: 100%;
        width: 100%;
    }
}
  
.drag-drop-zone.drag-over {
    background-color: #f0f0f0;
    border-color: #999;
}

.drag-drop-zone.showing-preview {
    height: 400px;
}
  
.file-input {
    display: none;
}
  
.placeholder {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--admin-transparent);
    padding: 0rem 1rem;
}

.placeholder svg {
    margin-bottom: 10px;
    height: 40px;
    width: 40px;
    fill: var(--admin-transparent);
}
  
.image-preview-container .wrapper {
    position: relative;
    border: 2px dashed var(--admin-transparent);
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.preview-image {
    width: 60%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.remove-button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    height: 40px;
    background-color: var(--background-color-secondary);
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
    will-change: background-color, color, opacity;
}


.remove-button:hover {
    background-color: var(--error);
    color: var(--background-color-secondary);
}
</style>