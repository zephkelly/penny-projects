<template>
    <section class="image-manager" v-show="isAdmin && imageManagerPopupOpen().value">
        <div class="overlay" @click="closeImageManager()" title="Exit Image Manager">

        </div>
        <div class="panel">
            <div class="manager-header">
                <div class="title">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M363.08-406.15h373.84L612.77-569.23l-95.08 121.54-62.77-77.69-91.84 119.23ZM322.31-260Q292-260 271-281q-21-21-21-51.31v-455.38Q250-818 271-839q21-21 51.31-21h455.38Q808-860 829-839q21 21 21 51.31v455.38Q850-302 829-281q-21 21-51.31 21H322.31Zm0-60h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H322.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q152-120 131-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h515.38v60H182.31ZM310-800v480-480Z"/></svg>
                    <h1>Image Manager</h1>
                </div>
                <div class="header-actions">
                    <button class="upload-image">
                        +  Upload Image
                    </button>
                    <button class="exit" @click="closeImageManager()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                </div>
            </div>
            <div class="manager-main">
                <div class="wrapper absolute">
                    <div class="explorer">
                        <div class="extra-actions">
                            <button @click="handleAllImagesClick()">All Images</button>
                        </div>
                        <div class="folder-header">
                            <h2>Folders</h2>
                            <div class="folder-actions">
                                <svg v-if="creatingFolder" class="creating-folder-spinner" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
                                <button v-else class="new-folder"  @click="createNewFolder()">
                                    + New
                                </button>
                            </div>
                        </div>
                        <div class="folders-list">
                            <ul>
                                <li class="creating-new-folder" v-if="creatingFolder">
                                    <div class="folder-label">
                                        <div class="folder-label-main">
                                            <div class="placeholder-group">
                                                <span class="indicator-placeholder"></span>
                                                <span class="icon-placeholder"></span>
                                                <span class="title-placeholder"></span>
                                            </div>
                                            <span class="more-actions-placeholder"></span>
                                        </div>
                                    </div>
                                </li>
                                <li v-for="(folder, index) in folders"
                                    :key="index"
                                    class="folder"
                                    :class="{ open: openFolders[index], renaming: folder.is_renaming, deleting: folder.is_deleting }">
                                    <div class="folder-label">
                                        <div class="folder-label-main" @click="handleFolderClick(index, folder.name)">
                                            <svg class="folder-indicator" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
                                            <svg class="folder-icon opened" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M170-180q-29.15 0-49.58-20.42Q100-220.85 100-250v-457.69q0-29.15 21.58-50.73T172.31-780h219.61l80 80h315.77q26.85 0 46.31 17.35 19.46 17.34 22.54 42.65H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 4.23 2.12 6.92 2.11 2.7 5.57 4.62L261-552.31h666.31l-96.85 322.62q-6.85 22.53-25.65 36.11Q786-180 763.08-180H170Zm60.54-60h540.23l75.46-252.31H306L230.54-240Zm0 0L306-492.31 230.54-240ZM160-640V-720v80Z"/></svg>
                                            <svg class="folder-icon closed" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h219.61l80 80h315.77Q818-700 839-679q21 21 21 51.31v375.38Q860-222 839-201q-21 21-51.31 21H172.31Zm0-60h615.38q5.39 0 8.85-3.46t3.46-8.85v-375.38q0-5.39-3.46-8.85t-8.85-3.46H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.85 3.46ZM160-240v-480 480Z"/></svg>
                                            <span class="placeholder-title" v-if="folder.is_renaming"></span>
                                            <p class="folder-title" v-else>{{ folder.name }}</p>
                                        </div>
                                        <div class="folder-more-actions">
                                            <button class="more-actions" v-if="!folder.is_renaming" @click="openFloatingMenu($event, folder)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M479.79-221.23q-21.54 0-36.66-15.34Q428-251.91 428-273.44q0-21.54 15.34-36.67 15.34-15.12 36.87-15.12 21.54 0 36.66 15.34Q532-294.56 532-273.02t-15.34 36.66q-15.34 15.13-36.87 15.13Zm0-206.77q-21.54 0-36.66-15.34Q428-458.68 428-480.21q0-21.54 15.34-36.66Q458.68-532 480.21-532q21.54 0 36.66 15.34Q532-501.32 532-479.79q0 21.54-15.34 36.66Q501.32-428 479.79-428Zm0-206.77q-21.54 0-36.66-15.34Q428-665.44 428-686.98t15.34-36.66q15.34-15.13 36.87-15.13 21.54 0 36.66 15.34Q532-708.09 532-686.56q0 21.54-15.34 36.67-15.34 15.12-36.87 15.12Z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="folder-content">
                                        <ul>
                                            <li v-for="image in folder.images" @click="openImageTab(image)">
                                                <div class="image">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"/></svg>
                                                    <p>{{ image.label }}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <div class="create-new-folder-wrapper">
                                    <button class="create-new-folder" @click="createNewFolder()">
                                        + New Folder
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="contents-container">
                        <div class="tabs-container">
                            <div class="extra-actions">
                            </div>
                            <div class="tabs">
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
                                        @drop="drop($event, tab.id)">
                                        <p>{{ tab.name }}</p>
                                        <button class="exit" @click.stop="closeTab(tab.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M256-181.91 181.91-256l224-224-224-224L256-778.09l224 224 224-224L778.09-704l-224 224 224 224L704-181.91l-224-224-224 224Z"/></svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="content-view">
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
                            <div v-else class="no-tab">
                                <p class="empty-text">Select a folder or "All Images" to view contents.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wrapper absolute">
                    <div class="upload-image-container">
                        <input type="file" ref="image" @change="handleFileUpload" accept="image/*" />
                        <button class="upload-image-btn" >Upload Image</button>
                    </div>
                    <div class="delete-image-container">
                        <button class="delete-image-btn" @click="deleteImageViaHash()">Delete Image</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showFloatingMenu" 
            class="floating-menu" 
            :style="{ top: floatingMenuPosition.top + 'px', left: floatingMenuPosition.left + 'px' }">
            <ul>
                <li @click="renameFolder()">Rename</li>
                <li @click="deleteFolder()">Delete</li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { type Folder, type FrontendFolder, type FrontendPayload } from '~/types/database';

const { isAdmin } = useAuth();
 
function closeImageManager() {
    imageManagerPopupOpen().value = false;
}

// #region Floating Menu Functionality ----------------------------------
const showFloatingMenu = ref(false);
const floatingMenuPosition = ref({ top: 0, left: 0 });
const selectedFolder: Ref<Folder | null> = ref<Folder | null>(null);

function openFloatingMenu(event: MouseEvent, folder: any) {
    event.stopPropagation();
    selectedFolder.value = folder;
    
    const { clientX, clientY } = event;
    const menuWidth = 150;
    const menuHeight = 100;
    
    let left = clientX;
    let top = clientY;
    
    if (left + menuWidth > window.innerWidth) {
        left = window.innerWidth - menuWidth;
    }
    
    if (top + menuHeight > window.innerHeight) {
        top = window.innerHeight - menuHeight;
    }
    
    floatingMenuPosition.value = { top, left };
    showFloatingMenu.value = true;
    
    setTimeout(() => {
        document.addEventListener('click', closeFloatingMenu);
    }, 0);
}

function closeFloatingMenu() {
    showFloatingMenu.value = false;
    document.removeEventListener('click', closeFloatingMenu);
}
// #endregion

// #region Image Functionality ------------------------------------------
const selectedImage = ref(null);

const getAllFolderImages = computed(() => {
  return folders.value.flatMap(folder => folder.images);
});

function useSelectedImage() {
    const activeImage = getActiveTabImage();
    if (activeImage) {
        selectedImage.value = activeImage;
        closeImageManager();
        emit('imageSelected', selectedImage.value);
    }
}

async function handleFileUpload() {
    //@ts-ignore
    const imageFile: any = image.value.files[0];
    
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
        const base64Image = reader.result.split(',')[1];

        // @ts-ignore
        const response = await useFetch('/api/upload/image', {
            method: 'POST',
            body: { image: base64Image }
        });
    };
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

function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}
// #endregion

// #region Tab Functionality --------------------------------------------
const allImagesOpen = ref(false);
const openTabs:Ref<Tab[]> = ref([]);
const activeTab: Ref<null | number> = ref(null);
const draggedTabId: Ref<null | number> = ref<number | null>(null);

interface Tab {
    id: number;
    name: string;
    folderIndex: number | null;
    type: 'folder' | 'image';
    image?: any;
}

function openTab(name: string, folderIndex: number | null) {
    if (allImagesOpen.value) {
        allImagesOpen.value = false;
    }

    const existingTab: Tab = openTabs.value.find(tab => tab.name === name) as Tab;

    if (existingTab) {
        activeTab.value = existingTab.id;
    }
    else {
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

function openImageTab(image: any) {
    const existingTab = openTabs.value.find(tab => tab.type === 'image' && tab.image && tab.image.url === image.url);
    
    if (existingTab) {
        activeTab.value = existingTab.id;
    }
    else {
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

function closeTab(tabId: number) {
    const index = openTabs.value.findIndex(tab => tab.id === tabId);
    const folderIndex = openTabs.value[index].folderIndex as number;

    setFolderOpen(folderIndex, false);

    if (openTabs.value[index].name === 'All Images') {
        allImagesOpen.value = false;
    }

    if (index !== -1) {
        openTabs.value.splice(index, 1);
        if (activeTab.value === tabId) {
            activeTab.value = openTabs.value.length > 0 ? openTabs.value[openTabs.value.length - 1].id : null;
        }
    }
}

function setActiveTab(tabId: number) {
    activeTab.value = tabId;
}

function getActiveTabType() {
    const tab = openTabs.value.find(tab => tab.id === activeTab.value);
    return tab ? tab.type : null;
}

function getActiveTabImage() {
    const tab = openTabs.value.find(tab => tab.id === activeTab.value);
    return tab && tab.type === 'image' ? tab.image : null;
}

function getActiveTabName() {
    const tab = openTabs.value.find(tab => tab.id === activeTab.value);
    return tab ? tab.name : '';
}

function getActiveTabImages() {
    const tab = openTabs.value.find(tab => tab.id === activeTab.value);
    if (!tab) return [];
    if (tab.name === 'All Images') {
        return getAllFolderImages.value;
    } else if (tab.folderIndex !== null) {
        return folders.value[tab.folderIndex].images;
    }
    return [];
}

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
// #endregion

// #region Folder Functionality -----------------------------------------
type FolderPayload = FrontendPayload<Folder>;

const folders = ref<FrontendFolder[]>([]);
folders.value = await getPopulatedFolders() as FrontendFolder[];

// const data = [
//     {
//         folder_id: 1,
//         name: 'Zambia',
//         created_date: '2021-09-01',
//         updated_date: '2021-09-01',
//         is_new: false,
//         images: [
//             {
//                 image_id: 1,
//                 url: 'https://i.imgur.com/pNS6QhN.jpeg',
//                 delete_hash: '1b2b3c4',
//                 label: 'Zambia',
//                 width: 1920,
//                 height: 1080,
//                 upload_date: '2021-09-01',
//                 file_size: 123456,
//                 colour_main: '#000000',
//                 colour_contrast: '#ffffff',
//                 parent_folder_id: 1
//             },
//             {
//                 image_id: 2,
//                 url: 'https://i.imgur.com/VCmqt80.jpeg',
//                 delete_hash: '1b2b3c4',
//                 label: 'Africa',
//                 width: 1920,
//                 height: 1080,
//                 upload_date: '2021-09-01',
//                 file_size: 123456,
//                 colour_main: '#000000',
//                 colour_contrast: '#ffffff',
//                 parent_folder_id: 1
//             },
//             {
//                 image_id: 3,
//                 url: 'https://i.imgur.com/VCmqt80.jpeg',
//                 delete_hash: '1b2b3c4',
//                 label: 'Yolodolo',
//                 width: 1920,
//                 height: 1080,
//                 upload_date: '2021-09-01',
//                 file_size: 123456,
//                 colour_main: '#000000',
//                 colour_contrast: '#ffffff',
//                 parent_folder_id: 1
//             }
//         ]
//     }
// ]
//@ts-ignore
// folders.value.push(...data as PopulatedFolder[]);

const openFolders = ref(folders.value.map(() => false));

async function getPopulatedFolders(): Promise<FrontendFolder[] | null> {
    try {
        const { data, status } = await useFetch<FrontendFolder[]>('/api/folders');

        return data.value as FrontendFolder[];
    }
    catch (error) {
        return null;
    }
}

const creatingFolder = ref(false);
async function createNewFolder() {
    const folderName = await window.prompt('Enter folder name');

    if (!folderName) {
        window.alert('No folder name provided!');
        return;
    }

    creatingFolder.value = true;

    try {
        const response = await $fetch<FolderPayload>('/api/create/folder', {
            method: 'POST',
            body: { name: folderName }
        });

        if (response.status !== 200) {
            creatingFolder.value = false;
            window.alert('Error creating folder: ' + response.message);
            return;
        }

        if (!response.data) {
            creatingFolder.value = false;
            window.alert('No folder data returned');
            return;
        }
        
        const newFolder: FrontendFolder = {
            folder_id: response.data.folder_id,
            name: response.data.name,
            created_date: response.data.created_date,
            updated_date: response.data.updated_date,
            is_new: true,
            images: []
        };

        folders.value = [newFolder, ...folders.value];
    }
    catch (error: any) {
        if (error.status === 409) {
            creatingFolder.value = false;
            window.alert('Folder name already exists! Please choose a different name.');
        }
        else {
            creatingFolder.value = false;
            window.alert('Error creating folder: ' + error.message);
        }
    }
    finally {
        creatingFolder.value = false;
    }
}

async function renameFolder() {
    const folderDOMIndex = folders.value.findIndex((folder: FrontendFolder) => folder.folder_id === selectedFolder.value?.folder_id);
    
    if (folderDOMIndex === -1) {
        console.error('Cannot find folder in DOM');
        return;
    }
    
    const newName: string | null = await window.prompt('Enter new folder name:');

    if (folders.value[folderDOMIndex].name === newName) {
        console.log('New name is the same as the old name');
        return;
    }
    
    if (!newName) {
        window.alert('No name provided');
        return;
    }
    
    if (!selectedFolder.value) {
        window.alert('No folder selected');
        return;
    }
    
    folders.value[folderDOMIndex].is_renaming = true;

    let response: FolderPayload;

    try {
        response = await $fetch<FolderPayload>('/api/rename/folder', {
            method: 'POST',
            body: {
                name: newName,
                folder_id: selectedFolder.value.folder_id
            }
        });
    }
    catch (error: any) {
        if (error.status === 409)
        {
            folders.value[folderDOMIndex].is_renaming = false;
            window.alert('Folder name already exists! Please choose a different name.');
            return;
        }

        folders.value[folderDOMIndex].is_renaming = false;
        return;
    }

    if (response.status !== 200) {
        folders.value[folderDOMIndex].is_renaming = false;
        window.alert('Error renaming folder: ' + response.message);
        return;
    }

    folders.value[folderDOMIndex].name = newName;
    folders.value[folderDOMIndex].is_renaming = false;

    closeFloatingMenu();
}

async function deleteFolder() {
    const folder_id = selectedFolder.value?.folder_id;

    if (!folder_id) {
        window.alert('No folder selected');
        return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this folder?');

    if (!confirmDelete) {
        return;
    }

    const folderDOMIndex = folders.value.findIndex((folder: FrontendFolder) => folder.folder_id === folder_id);

    if (folderDOMIndex === -1) {
        console.error('Cannot find folder in DOM');
        return;
    }

    folders.value[folderDOMIndex].is_deleting = true;

    try {
        const response = await $fetch('/api/delete/folder', {
            method: 'POST',
            body: { folder_id }
        });

        if (response.status !== 200) {
            folders.value[folderDOMIndex].is_deleting = false;
            window.alert('Error deleting folder: ' + response.message);
            return;
        }
    }
    catch (error: any) {
        folders.value[folderDOMIndex].is_deleting = false;
        window.alert('Error deleting folder: ' + error.message);
        return;
    }
    finally {
        folders.value.splice(folderDOMIndex, 1);
        closeFloatingMenu();
    }
}

function handleFolderClick(index: number, folderName: string) {
    if (openFolders.value[index]) {
        toggleFolderOpen(index);
    }
    else {
        toggleFolderOpen(index);
        openTab(folderName, index);
    }
}

function handleAllImagesClick() {
    allImagesOpen.value = !allImagesOpen.value;

    if (allImagesOpen.value) {
        openTab('All Images', null);
    }
}

function toggleFolderOpen(index: number) {
    openFolders.value[index] = !openFolders.value[index];
}

function setFolderOpen(index: number, value: boolean) {
    openFolders.value[index] = value;
}
//#endregion

watch(imageManagerPopupOpen(), (newValue, oldValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            document.body.style.overflow = 'visible';
        }, 100);
    }
});

const emit = defineEmits<{
    (e: 'imageSelected', image: any): void
}>();

defineExpose({
    closeImageManager,
    selectedImage
});
</script>

<style scoped lang="scss">
.folder-list-enter-active,
.folder-list-leave-active {
    transition: all 0.5s ease;
}
.folder-list-enter-from,
.folder-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.new-folder-highlight {
    animation: highlight 2s ease-in-out;
}

@keyframes highlight {
    0%, 100% {
        background-color: transparent;
    }
    50% {
        background-color: var(--admin-highlight);
    }
}
</style>

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
    background-color: rgba(0, 0, 0, 0.2);
    // backdrop-filter: blur(4px);
    z-index: 109;
    cursor: pointer;
}

.image-manager {
    font-family: 'Inter', sans-serif;
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
    // padding-top: 4rem;
    height: auto;
    box-sizing: border-box;
}

.panel {
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 600px;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--background-color-secondary);
    border-radius: 0.5rem;
    border: 1px solid var(--grey2);
    z-index: 111;
}

.manager-header {
    height: 60px;
    min-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--grey2);

    .title {
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 0.5rem;
        }

        h1 {
            font-family: 'Inter', sans-serif;
            font-size: 1.5rem;
            font-weight: 400;
            color: var(--black2);
        }
    }

    .header-actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 1.5rem;

        button.exit {
            height: 28px;
            width: 28px;
            padding: 0rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            border: 1px solid var(--black2);
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.2s ease, border 0.2s ease, color 0.2s ease;

            svg {
                width: 15px;
                height: 15px;
                fill: var(--black2);
                transition: fill 0.2s ease;
            }

            &:hover {
                border: 1px solid red;
                background-color: red;

                svg {
                    fill: var(--background-color-secondary);
                }
            }
        }

        button.upload-image {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100%;
            font-weight: 400;
            padding: 0.2rem 1rem;
            background-color: var(--admin-highlight);
            color: var(--black2);
            border: 1px solid var(--black2);
            border-radius: 0.75rem;
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease;

            &:hover {
                background-color: var(--admin-highlight-hover);
            }
        }
    }
}

.manager-main {
    position: relative;
    display: flex;
    flex-direction: row;
    height: calc(100% - 60px);
    width: 100%;

    .wrapper.absolute {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
}

.explorer {
    width: 200px;
    height: 100%;
    border-right: 1px solid var(--grey2);
    
    .extra-actions {
        height: 60px;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.8rem;
        background-color: var(--white2);

        button {
            width: 100%;
            border: 1px solid var(--grey2);
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: var(--background-color-secondary);
            cursor: pointer;

            &:hover {
                background-color: var(--off-white);
            }
        }
    }

    .folder-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        min-height: 40px;
        padding: 0.5rem 0.8rem;
        border-top: 1px solid var(--grey2);
        border-bottom: 1px solid var(--grey2);

        h2 {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 500;
            color: var(--black2);
        }

        .folder-actions {
            display: flex;
            align-items: center;
            justify-content: center;

            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                font-size: 11px;
                font-weight: 300;
                color: var(--grey2);
                transition: color 0.15s ease;
                will-change: color;

                &:hover {
                    color: var(--black2);
                    text-decoration: underline;
                }
            }

            svg {
                width: 14px;
                height: 14px;
                fill: var(--black2);
                animation: spin 1.5s linear infinite;

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
}

.folders-list {
    height: calc(100% - 60px - 40px);
    overflow-y: auto;
    scrollbar-width: thin;
    background-color: var(--white2);
    border-bottom-left-radius: 0.5rem;;
    
    li {
        height: 32px;
    }

    li.creating-new-folder {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--off-white);

        .folder-label-main {
            justify-content: space-between;
            padding-left: 12px;

            .placeholder-group {
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }

        .folder-label, .folder-label-main {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 100%;

            .indicator-placeholder, .icon-placeholder, .title-placeholder, .more-actions-placeholder {
                display: flex;
                background-color: var(--grey6);
                border-radius: 4px;
                position: relative;
                overflow: hidden;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(90deg, var(--grey6), var(--grey5), var(--grey6));
                    animation: shimmer 1.5s infinite;
                }
            }

            .indicator-placeholder {
                width: 10px;
                height: 12px;
                margin-right: 11px;
                opacity: 0;

                &::after {
                    animation-delay: 0.5s;
                }
            }

            .icon-placeholder {
                width: 14px;
                height: 12px;
                margin-right: 8px;

                &::after {
                    animation-delay: 0.2s;
                }
            }

            .title-placeholder {
                width: 60px;
                height: 12px;

                &::after {
                    animation-delay: 0.8s;
                }
            }

            .more-actions-placeholder {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 8px;
                height: 12px;
                margin-right: 8px;

                &::after {
                    animation-delay: 1s;
                }
            }
        }
    }

    li.folder {
        .folder-label {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 32px;
            cursor: pointer;

            &:hover {
                background-color: var(--off-white);
            }

            .folder-label-main {
                height: 100%;
                width: calc(100% - 26px);
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .folder-indicator {
                    width: 20px;
                    height: 20px;
                    min-width: 20px;
                    margin-left: 0.5rem;
                    margin-right: 0.3rem;
                    fill: var(--black2);
                    transition: transform 0.2s ease;
                }

                .folder-icon {
                    width: 16px;
                    min-width: 16px;
                    height: 16px;
                    margin-right: 0.45rem;
                    fill: var(--black2);

                    &.opened {
                        display: none;
                    }
                }

                .folder-title {
                    font-size: 12px;
                    font-weight: 400;
                    color: var(--black2);
                    white-space: nowrap;
                    user-select: none;
                    width: 100%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .folder-more-actions {
                width: 26px;
                height: 100%;
                min-width: 26px;
                display: flex;
                justify-content: center;
                align-items: center;

                button.more-actions {
                    position: relative;
                    width: 16px;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;

                    svg {
                        height: 18px;
                        width: 18px;
                        position: absolute;
                        pointer-events: none;
                        user-select: none;
                        fill: var(--black2);
                    }
                }
            }
        }

        .folder-content {
            display: flex;
            overflow: hidden;
            height: 0px;
            width: 100%;
            transition: height 0.2s ease;

            ul {
                width: 100%;
            }

            li {
                display: flex;
                height: 32px;
                padding: 0.4rem 0.5rem;
                padding-left: 44px;
                cursor: pointer;

                &:hover {
                    background-color: var(--off-white);
                }

                .image {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 0.45rem;
                    flex: 1;

                    svg {
                        width: 16px;
                        height: 16px;
                    }

                    p {
                        font-size: 12px;
                        color: var(--black2);
                        user-select: none;
                    }
                }
            }     
        }
    }

    li.folder.open {
        height: auto;

        .folder-label {
            // background-color: var(--background-color-secondary);

            &:hover {
                background-color: var(--off-white);
            }

            .folder-indicator {
                transform: rotate(90deg);
            }

            .folder-icon {
                &.opened {
                    display: block;
                }

                &.closed {
                    display: none;
                }
            }
        }

        .folder-content {
            height: auto;
        }
    }

    li.folder.renaming {
        .placeholder-title {
            position: relative;
            height: 12px;
            width: 70px;
            background-color: var(--grey6);
            border-radius: 4px;
            overflow: hidden;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: linear-gradient(90deg, var(--grey6), var(--grey5), var(--grey6));
                animation: shimmer 1.5s infinite;
            }
        }
    }

    li.folder.deleting {
        opacity: 0.8;
        animation: pulse-error 2s infinite;
        transition: opacity 0.2s ease, background-color 0.2s ease;
        will-change: opacity, background-color;

        .folder-label {
            button.more-actions {
                user-select: none;
                pointer-events: none;
                svg {
                    fill: var(--error);
                }
            }
        }

        .folder-label-main {
            position: relative;

            .folder-icon, .folder-indicator {
                fill: var(--error);
                color: var(--error);
            }

            .folder-title {
                position: relative;
                color: var(--error);
            }
        }
    }

    .create-new-folder-wrapper {
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;


        button {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-align: center;
            height: 100%;
            width: 100%;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 300;
            padding: 0.2rem 1rem;
            padding-left: 23px;
            color: var(--grey2);
            background-color: var(--white2);
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease;

            &:hover {
                text-decoration: underline;
                background-color: var(--off-white);
                color: var(--black2);
            }
        }
    }

    @keyframes pulse-error {
        0% {
            background-color: rgb(255, 226, 226);
            opacity: 0.5;
        }
        50% {
            background-color: var(--white2);
            opacity: 0.8;
        }
        100% {
            background-color: rgb(255, 226, 226);
            opacity: 0.5;
        }
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
}

.contents-container {
    display: flex;
    flex-direction: column;

    width: calc(100% - 200px);
    height: 100%;
}

.tabs-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60px;
    min-height: 60px;
    background-color: var(--white2);

    .extra-actions {
        height: 32px;
    }

    .tabs {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        overflow-x: auto;
        scrollbar-width: thin;
    }

    ul {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        list-style: none;
        padding-right: 32px;
        position: relative;
    }

    li {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        padding-right: 0.55rem;
        border: 1px solid var(--white2);
        border-bottom: none;
        cursor: pointer;
        user-select: none;

        p {
            font-size: 12px;
            font-weight: 400;
            color: var(--black2);
            white-space: nowrap;
            user-select: none;
        }

        &:last-child {
            border-top-right-radius: 0.5rem;
        }

        &.active {
            background-color: var(--background-color-secondary);
            border-top: 1px solid var(--grey2);
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
            background-color: var(--background-color-secondary);
        }

        button.exit {
            width: 18px;
            height: 18px;
            position: relative;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.2s ease;

            svg {
                position: absolute;
                width: 12px;
                height: 12px;
            }

            &:hover {
                background-color: var(--error);

                svg {
                    fill: var(--background-color-secondary);
                }
            }
        }
    }
}

.content-view {
    height: calc(100% - 60px);
    border-top: 1px solid var(--grey2);
    overflow-y: auto;
    border-bottom-right-radius: 0.5rem;

    .no-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: var(--white2);
        color: var(--grey4);

        p {
            user-select: none;
        }
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
        padding: 1rem;

        .preview-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;

            p {
                font-size: 12px;
                color: var(--grey2);
                user-select: none;
            }
        }
        
        .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 120px;
            height: 120px;
            padding: 0.8rem;
            border-radius: 4px;
            background-color: var(--off-white);

            img {
                width: 100%;
                height: 100%;
                border-radius: 0.5rem;
                object-fit: contain;
                border-radius: 4px;
            }
        }
    }
}

.floating-menu {
    position: fixed;
    background-color: var(--background-color-secondary);
    border: 1px solid var(--grey3);
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow: hidden;
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
            padding: 8px 18px;
            cursor: pointer;
            font-size: 11px;
            text-rendering: optimizeLegibility;
            color: var(--black2);
            border-bottom: 1px solid var(--grey5);
        
            &:hover {
                background-color: var(--off-white);
                border-radius: 4px;
            }

            &:last-child {
                border-bottom: none;
            }
        }
    }
}

svg {
    fill: var(--black2);
}
</style>