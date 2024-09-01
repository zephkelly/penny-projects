<template>
    <section class="image-manager" v-show="isAdmin && imageManagerPopupOpen().value">
        <div class="overlay" @click="closeImageManager()" title="Exit Image Manager">

        </div>
        <div class="panel">
            <div class="heading">
                <div class="group">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M363.08-406.15h373.84L612.77-569.23l-95.08 121.54-62.77-77.69-91.84 119.23ZM322.31-260Q292-260 271-281q-21-21-21-51.31v-455.38Q250-818 271-839q21-21 51.31-21h455.38Q808-860 829-839q21 21 21 51.31v455.38Q850-302 829-281q-21 21-51.31 21H322.31Zm0-60h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H322.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q152-120 131-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h515.38v60H182.31ZM310-800v480-480Z"/></svg>
                    <h1>Image Manager</h1>
                </div>
                <div class="group">
                    <button class="exit" @click="closeImageManager()">
                        <svg class="exit-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M256-181.91 181.91-256l224-224-224-224L256-778.09l224 224 224-224L778.09-704l-224 224 224 224L704-181.91l-224-224-224 224Z"/></svg>
                    </button>
                </div>
            </div>
            <div class="main">
                <div class="folders">
                    <div class="folder-title">
                        <h2>EXPLORER</h2>
                    </div>
                    <div class="folder-content">
                        <ul>
                            <li class="all">
                                <div class="folder" @click="handleAllImagesClick">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M100-560v-300h300v300H100Zm60-60h180v-180H160v180Zm-60 520v-300h300v300H100Zm60-60h180v-180H160v180Zm400-400v-300h300v300H560Zm60-60h180v-180H620v180Zm-60 520v-300h300v300H560Zm60-60h180v-180H620v180ZM340-620Zm0 280Zm280-280Zm0 280Z"/></svg>
                                    <p>All Images</p>
                                </div>
                            </li>
                            <div class="other-folders">
                                <div class="wrapper title">
                                    <h3>Folders</h3>
                                </div>
                                <div class="wrapper folders" ref="foldersWrapper">
                                    <li v-for="(folder, index) in data.folders"
                                        :key="index"
                                        class="folder" 
                                        :class="{ open: openFolders[index] }">
                                        <svg class="folder-indicator" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
                                        <div class="label" @click="handleFolderClick(index, folder.name)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M170-180q-29.15 0-49.58-20.42Q100-220.85 100-250v-457.69q0-29.15 21.58-50.73T172.31-780h219.61l80 80h315.77q26.85 0 46.31 17.35 19.46 17.34 22.54 42.65H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 4.23 2.12 6.92 2.11 2.7 5.57 4.62L261-552.31h666.31l-96.85 322.62q-6.85 22.53-25.65 36.11Q786-180 763.08-180H170Zm60.54-60h540.23l75.46-252.31H306L230.54-240Zm0 0L306-492.31 230.54-240ZM160-640V-720v80Z"/></svg>
                                            <p>{{ folder.name }}</p>
                                        </div>
                                        <div class="content-list">
                                            <ul>
                                                <li v-for="image in folder.images" @click="openImageTab(image)">
                                                    <div class="image">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Zm140-370q20.77 0 35.38-14.62Q390-599.23 390-620q0-20.77-14.62-35.38Q360.77-670 340-670q-20.77 0-35.38 14.62Q290-640.77 290-620q0 20.77 14.62 35.38Q319.23-570 340-570Z"/></svg>
                                                        <p>{{ image.label }}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="window-container">
                    <nav class="window-tabs">
                        <ul>
                            <li 
                                v-for="tab in openTabs" 
                                :key="tab.id" 
                                @click="setActiveTab(tab.id)" 
                                :class="{ active: activeTab === tab.id }"
                                draggable="true"
                                @dragstart="dragStart($event, tab.id)"
                                @dragover.prevent
                                @dragenter.prevent
                                @drop="drop($event, tab.id)"
                            >
                                <svg v-if="tab.type === 'image'" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Zm140-370q20.77 0 35.38-14.62Q390-599.23 390-620q0-20.77-14.62-35.38Q360.77-670 340-670q-20.77 0-35.38 14.62Q290-640.77 290-620q0 20.77 14.62 35.38Q319.23-570 340-570Z"/></svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M170-180q-29.15 0-49.58-20.42Q100-220.85 100-250v-457.69q0-29.15 21.58-50.73T172.31-780h219.61l80 80h315.77q26.85 0 46.31 17.35 19.46 17.34 22.54 42.65H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 4.23 2.12 6.92 2.11 2.7 5.57 4.62L261-552.31h666.31l-96.85 322.62q-6.85 22.53-25.65 36.11Q786-180 763.08-180H170Zm60.54-60h540.23l75.46-252.31H306L230.54-240Zm0 0L306-492.31 230.54-240ZM160-640V-720v80Z"/></svg>
                                {{ tab.name }}
                                <button @click.stop="closeTab(tab.id)">&times;</button>
                            </li>
                        </ul>
                    </nav>
                    <div class="window-page">
                        <div class="page-container" v-if="activeTab !== null" :class="{ image: getActiveTabType() === 'image' }">
                            <div v-if="getActiveTabType() === 'folder'" class="image-grid">
                                <div v-for="image in getActiveTabImages()" :key="image.delete_hash" class="image-preview" @click="openImageTab(image)">
                                    <div class="preview-container">
                                        <div class="image-container">
                                            <img :src="image.url" :alt="image.label" />
                                        </div>
                                        <p>{{ image.label }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="getActiveTabType() === 'image'" class="image-detail">
                                <div class="large-image-container">
                                    <img :src="getActiveTabImage().url" :alt="getActiveTabImage().label" />
                                </div>
                                <div class="image-info">
                                    <h2 class="title">{{ getActiveTabImage().label }}</h2>
                                    <div class="group">
                                        <p>Width: {{ getActiveTabImage().width }}px</p>
                                        <p>Height: {{ getActiveTabImage().height }}px</p>
                                        <p>Upload Date: {{ getActiveTabImage().upload_date }}</p>
                                    </div>
                                    <button @click="useSelectedImage" class="use-image-btn">Use Image</button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="no-tab">
                            <p class="empty-text">Select a folder or "All Images" to view contents.</p>
                        </div>
                    </div>
                </div>

                <!-- <div>
                    <h2>Upload Image to Imgur</h2>
                    <form @submit.prevent="handleFileUpload()">
                        <div>
                            <label for="image">Select an image:</label>
                            <input type="file" ref="image" required>
                        </div>
                        <button type="submit" @click.prevent="handleFileUpload()">Upload</button>
                    </form>
                </div>
                <div>
                    <h2>Delete Image Via Hash</h2>
                    <form @submit.prevent="handleFileUpload()">
                        <button type="submit" @click.prevent="deleteImageViaHash()">Delete</button>
                    </form>
                </div>
                <div>
                    <h2>Close Image Manager</h2>
                    <button @click="imageManagerPopupOpen().value = !imageManagerPopupOpen().value">close</button>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { isAdmin } = useAuth();

const data = {
    folders: [
        {
            name: 'Zambia',
            images: [
                {
                    url: 'https://i.imgur.com/pNS6QhN.jpeg',
                    delete_hash: '1b2b3c4',
                    label: 'Zambia',
                    width: 1920,
                    height: 1080,
                    upload_date: '2021-09-01',
                    file_size: 123456,
                    color_main: '#000000',
                    color_contrast: '#ffffff',
                },
                {
                    url: 'https://i.imgur.com/VCmqt80.jpeg',
                    delete_hash: '1b2b3c4',
                    label: 'Africa',
                    width: 1920,
                    height: 1080,
                    upload_date: '2021-09-01',
                    file_size: 123456,
                    color_main: '#000000',
                    color_contrast: '#ffffff',
                },
                {
                    url: 'https://i.imgur.com/VCmqt80.jpeg',
                    delete_hash: '1b2b3c4',
                    label: 'Yolodolo',
                    width: 1920,
                    height: 1080,
                    upload_date: '2021-09-01',
                    file_size: 123456,
                    color_main: '#000000',
                    color_contrast: '#ffffff',
                }
            ]
        }
    ]
}

const isOpen = ref(false);
const selectedImage = ref(null);

const allImagesOpen = ref(false);
const openFolders = ref(data.folders.map(() => false));
const openTabs:Ref<Tab[]> = ref([]);

function openImageManager() {
    imageManagerPopupOpen().value = true;
}

function closeImageManager() {
    imageManagerPopupOpen().value = false;
}

const emit = defineEmits<{
  (e: 'imageSelected', image: any): void
}>();

function useSelectedImage() {
  const activeImage = getActiveTabImage();
  if (activeImage) {
    selectedImage.value = activeImage;
    closeImageManager();
    // Emit an event or call a callback function to notify the parent component
    emit('imageSelected', selectedImage.value);
  }
}

interface Tab {
    id: number;
    name: string;
    folderIndex: number | null;
    type: 'folder' | 'image';
    image?: any;
}


function toggleFolder(index: number) {
    openFolders.value[index] = !openFolders.value[index];
}

function handleAllImagesClick() {
  allImagesOpen.value = !allImagesOpen.value;
  if (allImagesOpen.value) {
    openTab('All Images', null);
  } else {
    const allImagesTab = openTabs.value.find(tab => tab.name === 'All Images');
    if (allImagesTab) {
      closeTab(allImagesTab.id);
    }
  }
}

function handleFolderClick(index: number, folderName: string) {
  if (openFolders.value[index]) {
    // If the folder is already open, just close it
    toggleFolder(index);
  } else {
    // If the folder is closed, open it and set it as active
    toggleFolder(index);
    openTab(folderName, index);
  }
}

function openImageTab(image: any) {
    // Check if the image is already opened in a tab
    const existingTab = openTabs.value.find(tab => tab.type === 'image' && tab.image && tab.image.url === image.url);
    
    if (existingTab) {
        // If the image is already opened, set it as the active tab
        activeTab.value = existingTab.id;
    } else {
        // If the image is not opened, create a new tab
        const newTab: Tab = {
            id: Date.now(),
            name: image.label,
            folderIndex: null,
            type: 'image',
            image: image
        };
        openTabs.value.push(newTab);
        activeTab.value = newTab.id;
    }
}

function getActiveTabType() {
  const tab = openTabs.value.find(tab => tab.id === activeTab.value);
  return tab ? tab.type : null;
}

function getActiveTabImage() {
  const tab = openTabs.value.find(tab => tab.id === activeTab.value);
  return tab && tab.type === 'image' ? tab.image : null;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
}

function openTab(name: string, folderIndex: number | null) {
    const existingTab: Tab = openTabs.value.find(tab => tab.name === name) as Tab;
    if (existingTab) {
        activeTab.value = existingTab.id;
    } else {
        const newTab = {
            id: Date.now(),
            name: name,
            folderIndex: folderIndex,
            type: 'folder' as const,            
        };

        openTabs.value.push(newTab);
        activeTab.value = newTab.id;
    }
}

function setActiveTab(tabId: number) {
    activeTab.value = tabId;
}

function closeTab(tabId: number) {
    const index = openTabs.value.findIndex(tab => tab.id === tabId);
    if (index !== -1) {
        openTabs.value.splice(index, 1);
        if (activeTab.value === tabId) {
            activeTab.value = openTabs.value.length > 0 ? openTabs.value[openTabs.value.length - 1].id : null;
        }
    }
}

const allImages = computed(() => {
  return data.folders.flatMap(folder => folder.images);
});

function getActiveTabName() {
    const tab = openTabs.value.find(tab => tab.id === activeTab.value);
    return tab ? tab.name : '';
}

function getActiveTabImages() {
  const tab = openTabs.value.find(tab => tab.id === activeTab.value);
  if (!tab) return [];
  if (tab.name === 'All Images') {
    return allImages.value;
  } else if (tab.folderIndex !== null) {
    return data.folders[tab.folderIndex].images;
  }
  return [];
}

async function handleFileUpload() {
    //@ts-ignore
    const imageFile = image.value.files[0];
    
    if (imageFile.length === 0) {
        console.log('No file selected');
        return;
    }
    
    if (!imageFile.type.startsWith('image/')) {
        console.error('File is not an image');
        return;
    }

    const imageSize = await checkImageSize(imageFile)
    console.log(imageSize)

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
        // @ts-ignore
        const base64Image = reader.result.split(',')[1]; // Remove the data:image/jpeg;base64, part

        // @ts-ignore
        const response = await useFetch('/api/upload/image', {
            method: 'POST',
            body: { image: base64Image }
        });

        console.log(response);
    };
}

function checkImageSize(file: File): Promise<{ width: number; height: number; fileSize: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
   
    reader.onload = function(e: ProgressEvent<FileReader>) {
      const img = new Image();
     
      img.onload = (event: Event) => {
        const loadedImg = event.target as HTMLImageElement;
        const size = {
          width: loadedImg.width,
          height: loadedImg.height,
          fileSize: file.size
        };
        resolve(size);
      };
     
      img.onerror = function() {
        reject(new Error('Failed to load image'));
      };
     
      img.src = e.target?.result as string;
    };
   
    reader.onerror = function() {
      reject(new Error('Failed to read file'));
    };
   
    reader.readAsDataURL(file);
  });
}

async function deleteImageViaHash() {
    const hash = window.prompt('Insert Image Hash');

    if (!hash) {
        console.error('No hash provided');
        return;
    }

    const response = await useFetch('/api/delete/image', {
        method: 'POST',
        body: { deleteHash: hash }
    });
}

const activeTab: Ref<null | number> = ref(null);
const draggedTabId: Ref<null | number> = ref<number | null>(null);

function dragStart(event: DragEvent, tabId: number) {
  draggedTabId.value = tabId;
}

function drop(event: DragEvent, targetTabId: number) {
  event.preventDefault();
  if (draggedTabId.value !== null && draggedTabId.value !== targetTabId) {
    const draggedIndex = openTabs.value.findIndex(tab => tab.id === draggedTabId.value);
    const targetIndex = openTabs.value.findIndex(tab => tab.id === targetTabId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedTab] = openTabs.value.splice(draggedIndex, 1);
      openTabs.value.splice(targetIndex, 0, draggedTab);
    }
  }
  draggedTabId.value = null;
}

watch(imageManagerPopupOpen(), (newValue, oldValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            document.body.style.overflow = 'visible';
        }, 100);
    }
});

defineExpose({
    openImageManager,
    closeImageManager,
    selectedImage
});
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    z-index: 109;
    cursor: pointer;
}

.image-manager {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 110;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: transparent;
    padding: 1rem;
    height: auto;
}

.panel {
    display: grid;
    grid-template-rows: 60px 1fr;
    width: 1000px;
    height: 100%;
    max-height: 1000px;
    height: 620px;
    background-color: var(--background-color-secondary);
    border-radius: 0.5rem;
    border: 1px solid var(--grey2);
    z-index: 111;
    pointer-events: all;
    overflow: hidden;
}

.main {
    display: grid;
    grid-template-columns: 200px 1fr;
    height: 100%;
    width: 100%;
    border-top: 1px solid var(--grey2);

    .folders {
        display: flex;
        flex-direction: column;
        width: 200px;
        height: 100%;
        border-right: 1px solid var(--grey2);

        .folder-title {
            height: 40px;
            padding: 0.8rem;
            border-bottom: 1px solid var(--grey2);
        }

        .folder-content {
            display: flex;
            flex-direction: column;
            flex: 1;

            ul {
                display: flex;
                flex-direction: column;
                flex: 1;
                list-style: none;
                padding: 0;
                margin: 0;
                height: 100%;

                li {
                    cursor: pointer;
                    transition: background-color 0.2s ease;

                    &:hover {
                        background-color: rgb(248, 248, 248);
                    }
                }
            }

            .all {
                background-color: var(--white2);
                padding: 0.8rem 0.8rem;

                &:hover {
                    background-color: var(--white2);
                }

                .folder {
                    justify-content: center;
                    padding: 0.5rem;
                    height: auto;
                    border-radius: 8px;
                    border: 1px solid var(--grey2);
                    transition: background-color 0.2s ease;
                    background-color: var(--background-color-secondary);
                    will-change: background-color;

                    &:hover {
                        background-color: rgb(248, 248, 248);
                    }

                    svg {
                        margin-left: -4px;
                        width: 24px;
                        height: 24px;
                    }
                }
            }

            .folder {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.5rem;
                height: auto;

                p {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                    color: var(--black2);
                }

                svg {
                    fill: var(--black2);
                    width: 18px;
                    height: 18px;
                }  
            }
        }

        .other-folders {
            display: flex;
            flex:1;
            flex-direction: column;
            grid-template-rows: 50px 1fr; 
            background-color: var(--white2);
            overflow: hidden;

            .wrapper.title {
                padding: 0.8rem 0rem;
                // padding-top: 1.8rem;
                border-top: 1px solid var(--grey2);
                border-bottom: 1px solid var(--grey2);
                background-color: var(--background-color-secondary);
            }

            h3 {
                font-family: 'Inter', sans-serif;
                font-size: 0.8rem;
                font-weight: 400;
                color: var(--black2);
                padding: 0 0.8rem;
            }

            .wrapper.folders {
                flex: 1;
                overflow-y: scroll;
                scrollbar-width: thin;
                max-height: 410px;

                .folder {
                    position: relative;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                .folder-indicator {
                    position: absolute;
                    top: 6px;
                    left: 3px;
                    user-select: none;
                    pointer-events: none;
                }

                .label {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    // width: calc(100% - 1.6rem);
                    align-items: center;
                    min-height: 32px;
                    justify-content: flex-start;
                    gap: 0.5rem;
                    user-select: none;
                    margin-bottom: -8px;

                    svg {
                        margin-left: 1.6rem;
                    }
                }

                .folder {
                    height: 32px;

                    .content-list {
                        display: flex;
                        overflow: hidden;
                        height: 0px;
                        width: 100%;
                        transition: height 0.2s ease;

                        li {
                            display: flex;
                            height: 32px;
                            padding: 0.4rem 0.5rem;
                            padding-left: 2.2rem;

                            .image {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                gap: 0.5rem;
                                flex: 1;

                                p {
                                    user-select: none;
                                }
                            }
                        }
                    }
                }

                .folder.open {
                    height: auto;
                    background-color: var(--background-color-secondary);

                    .folder-indicator {
                        transform: rotate(90deg);
                    }

                    .content-list {
                        height: auto;
                    }
                }
            }
        }
    }

    .window-container {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-rows: 39px 1fr;

        .window-tabs {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            height: 40px;
            width: 100%;
            flex: 1;
            background-color: var(--white2);
            overflow-x: auto;
            scrollbar-width: thin;
            

            svg {
                fill: var(--black2);
                width: 18px;
                height: 18px;
            }

            ul {
                display: flex;
                width: 100%;
                height: 100%;
                list-style: none;
                padding: 0;
                margin: 0;
                
            }

            li {
                user-select: none;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                cursor: pointer;
                padding: 0.5rem 1rem;
                transition: background-color 0.2s ease;
                width: auto;
                font-family: 'Inter', sans-serif;
                font-size: 0.8rem;
                border-right: 1px solid var(--white2);
                border-left: 1px solid var(--white2);

                &.active {
                    background-color: var(--background-color-secondary);
                    position: relative;
                    border-right: 1px solid var(--grey2);
                    border-left: 1px solid var(--grey2);
                    
                    &:first-child {
                        border-right: 1px solid var(--grey2);
                        border-left: 1px solid var(--white2);
                    }

                    &:last-child {
                        border-left: 1px solid var(--grey2);
                        border-right: 1px solid var(--grey2);

                        &:first-child {
                            border-left: 1px solid var(--white2);
                        }
                    }
                }

                &:hover {
                    background-color: rgb(248, 248, 248);
                }

                button {
                    position: relative;
                    right: -4px;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // padding: 0.5rem;
                    transition: background-color 0.2s ease;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    
                    &:hover {
                        background-color: red;
                        color: var(--background-color-secondary);
                    }
                }
            }
        }

        .window-page {
            display: flex;
            flex-direction: row;
            height: 100%;
            background-color: var(--white2);
            border-top: 1px solid var(--grey2);

            .page-container {
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 1rem;
                background-color: var(--background-color-secondary);
                overflow-y: scroll;

                &.image {
                    overflow: visible;
                }
            }

            .image-grid {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 0.8rem;
                max-height: 400px;
            }

            .image-preview {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;

                &:last-child {
                    padding-bottom: 6rem;
                }

                .preview-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem 0.5rem;
                    border-radius: 4px;

                    &:hover {
                        background-color: var(--white2);
                    }
                }

                .image-grid {
                    flex-direction: row;
                }

                p {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: var(--black2);
                }
            }

            .image-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
                width: 100px;
                overflow: hidden;

                img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: 4px;
                }
            }
        }

        .page-container.image {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 0rem;

            .image-detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                height: 100%;
            }

            .large-image-container {
                display: flex;
                justify-content: center;
                height: 400px;
                width: 100%;
                padding: 1rem 1rem;

                img {
                    height: 100%;
                    width: auto;
                    object-fit: contain;
                }
            }

            .image-info {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                border-top: 1px solid var(--grey2);
                padding: 1rem;

                h2 {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    font-weight: 400;
                    color: var(--black2);
                    margin-bottom: 1rem;
                }

                .group {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 1rem;
                    height: 100%;

                    p {
                        font-family: 'Inter', sans-serif;
                        font-size: 0.8rem;
                        font-weight: 400;
                        color: var(--black2);
                        margin-bottom: 0.5rem;
                    }
                }
            }
        }

        .no-tab {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;

            .empty-text {
                font-family: 'Inter', sans-serif;
                font-size: 01.2rem;
                font-weight: 400;
                color: var(--grey4);
                padding: 1rem;
                text-align: center;
            }
        }
    }

    h2 {
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--black2);
    }
}

.heading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    padding: 1rem;

    .group {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
    }

    svg {
        fill: var(--black2);
        width: 28px;
        height: 28px;

        &.exit-icon {
            transition: fill 0.2s ease;
            width: 14px;
            height: 14px;
        }
    }

    h1 {
        font-family: 'Inter', sans-serif;
        font-size: 1.5rem;
        font-weight: 400;
        color: var(--black2);
    }

    .exit {
        width: 28px;
        height: 28px;
        position: relative;
        background-color: transparent;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        border: 1px solid var(--black2);
        padding: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: red;
            border-color: red;

            svg {
                fill: var(--background-color-secondary);
            }
        }
    }
}

</style>