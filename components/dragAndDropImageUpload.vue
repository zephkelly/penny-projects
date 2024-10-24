<template>
    <div class="image-upload-container" :class="{ 'flex-to-parent': flexToParent, 'hidden': hidden && !isDragging, 'preview-flex-to-parent': previewFlexToParent }">
        <div v-if="!imagePreview" 
            class="drag-drop-zone"
            @drag.prevent
            @dragstart.prevent
            @dragend.prevent
            @dragover.prevent
            @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': isDragging, 'showing-preview': imagePreview, 'flex-to-parent': flexToParent }"
            @click="debounceTriggerFileInput"
            >
                
            <div class="placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                <p v-if="!flexToParent">Drag and drop your image here or click to select</p>
            </div>
        </div>
        <input v-if="!imagePreview"
            type="file"
            ref="fileInput"
            @change="handleFileInput"
            accept="image/*"
            class="file-input"
        >
        <div v-else class="image-preview-container" :class="{ 'flex-to-parent': flexToParent, 'preview-flex-to-parent': previewFlexToParent, 'contain-preview': containPreview }">
            <div class="wrapper" >
                <img :src="imagePreview" alt="Cover image preview" class="preview-image">
                <button v-if="!previewFlexToParent" @click="removeImage" class="remove-button">Remove Image</button>
                <button v-else @click="removeImage" class="remove-button cross">X</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, type PropType } from 'vue';

    const props = defineProps({
        flexToParent: Boolean,
        previewFlexToParent: Boolean,
        containPreview: Boolean,
        hidden: Boolean,
        imageUrl: {
            type: String as PropType<string | null>,
            default: null
        }
    });

    const emit = defineEmits(['image-selected', 'image-removed', 'is-dragging', 'dropped-image']);
    
    const isDragging = ref(false);
    const imagePreview = ref<string | null>(null);
    const fileInput = ref<string | null>(null);

    watch(() => props.imageUrl, (newValue) => {
        if (newValue) {
            imagePreview.value = newValue;
        }
    });

    //watch value that emits event when dragging and image, and emits event when finished draggin, and emits a different event if it uploaded an image
    watch(() => isDragging.value, (newValue) => {
        if (newValue) {
            emit('is-dragging', true);
        } else {
            emit('is-dragging', false);
        }
    });

    onMounted(() => {
        if (props.imageUrl) {
            imagePreview.value = props.imageUrl;
        }
    });
    
    const handleDrop = (e: any) => {
        isDragging.value = false;
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
            emit('dropped-image', file);
        }
    };
    
    const handleFileInput = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    };
    
    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
            emit('image-selected', file);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        if (props.hidden) return;
        //@ts-ignore
        fileInput.value.click();
    };

    const debounceTriggerFileInput = debounce(triggerFileInput, 100);
    
    const removeImage = () => {
        imagePreview.value = null;
        if (fileInput.value) {
            fileInput.value = '';
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
        max-height: 100%;
    }
    
    * {
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
}

.image-upload-container.hidden {

    .drag-drop-zone {
        cursor: auto;
        opacity: 0;
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
        max-height: 100%;
    }

    &.preview-flex-to-parent {
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

    &.contain-preview {
        .wrapper {
            height: 100%;

            .preview-image {
                height: 100%;
                width: 100%;
                object-fit: contain;
            }
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
    user-select: none;
    pointer-events: none;
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