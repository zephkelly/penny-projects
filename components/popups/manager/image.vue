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
                    <button class="upload-image" @click="toggleIsUploadImage()">
                        +  Upload Image
                    </button>
                    <button class="exit" @click="closeImageManager()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                </div>
            </div>
            <div class="manager-main">
                <transition-group name="fade">
                    <div class="wrapper absolute image-upload-window" v-if="uploadingImage">
                        <div class="upload-form">
                            <div class="upload-header">
                                <div class="button-container">
                                    <button class="return-main-screen" @click="handleReturnToExplorer();">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m294.92-450 227.85 227.85L480-180 180-480l300-300 42.77 42.15L294.92-510H780v60H294.92Z"/></svg>
                                        <p class="return-browse">Back</p>
                                    </button>
                                </div>
                                <h2>Upload Image</h2>
                            </div>
                            <form @submit.prevent="" class="input-form">
                                <div class="input-group main">
                                    <div class="options-wrapper">
                                        <div class="option-group">
                                            <label for="image-label">Name</label>
                                            <input @input="setCurrentImageLabel();" v-model="imageLabel" type="text" placeholder="image1" />
                                        </div>
                                    </div>
                                    <div class="selection-wrapper">
                                        <div class="folder-selection">
                                            <label for="folder-select">Current Folder<span v-if="selectedParentFolderName !== ''">:</span> <strong>{{ selectedParentFolderName }}</strong></label>
                                        </div>
                                        <div class="folders-list folder-selection-list">
                                            <ul>
                                                <li v-for="(folder, index) in folders.filter(f => Number(f.folder_id) !== 0)"
                                                    :key="index"
                                                    class="folder selection-folder"
                                                    :class="{ 
                                                        renaming: folder.is_renaming,
                                                        deleting: folder.is_deleting,
                                                        selected: index === selectedParentFolderIndex,
                                                    }">
                                                    <div class="folder-label">
                                                        <div class="folder-label-main" @click="handleFolderSetParentClick(index, folder.folder_id, folder.name)">
                                                            <svg class="folder-icon opened" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M170-180q-29.15 0-49.58-20.42Q100-220.85 100-250v-457.69q0-29.15 21.58-50.73T172.31-780h219.61l80 80h315.77q26.85 0 46.31 17.35 19.46 17.34 22.54 42.65H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 4.23 2.12 6.92 2.11 2.7 5.57 4.62L261-552.31h666.31l-96.85 322.62q-6.85 22.53-25.65 36.11Q786-180 763.08-180H170Zm60.54-60h540.23l75.46-252.31H306L230.54-240Zm0 0L306-492.31 230.54-240ZM160-640V-720v80Z"/></svg>
                                                            <svg class="folder-icon closed" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h219.61l80 80h315.77Q818-700 839-679q21 21 21 51.31v375.38Q860-222 839-201q-21 21-51.31 21H172.31Zm0-60h615.38q5.39 0 8.85-3.46t3.46-8.85v-375.38q0-5.39-3.46-8.85t-8.85-3.46H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.85 3.46ZM160-240v-480 480Z"/></svg>
                                                            <span class="placeholder-title" v-if="folder.is_renaming"></span>
                                                            <p class="folder-title" v-else>{{ folder.name }}</p>
                                                            <div class="folder-more-actions">
                                                                <button class="more-actions" v-if="!folder.is_renaming">
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group submit">
                                    <button type="submit" class="upload-btn" :class="{ enabled: canUploadImage }" @click="handleImageUpload">Upload</button>
                                </div>
                            </form>
                        </div>
                        <div class="drop-zone">
                            <DragAndDropImageUpload
                                flexToParent
                                containPreview
                                :imageUrl="currentUploadedImageBlogUrl"
                                @image-selected="handleDraggedFolderImage"
                                @image-removed="clearCurrentUploadedImage"
                                />
                        </div>
                    </div>
                    <div class="wrapper absolute" v-else>
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
                                    <li v-for="(folder, index) in folders.filter(f => Number(f.folder_id) !== 0)"
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
                                                <li v-for="image in folder.images" @click="openImageTab(image)" class="image-list-element">
                                                    <div class="image">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"/></svg>
                                                        <div class="wrapper main">
                                                            <p>{{ image.label }}</p>
                                                            <div class="image-more-actions">
                                                                <button class="more-actions" v-if="!folder.is_renaming" @click="openFloatingMenu($event, folder)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M479.79-221.23q-21.54 0-36.66-15.34Q428-251.91 428-273.44q0-21.54 15.34-36.67 15.34-15.12 36.87-15.12 21.54 0 36.66 15.34Q532-294.56 532-273.02t-15.34 36.66q-15.34 15.13-36.87 15.13Zm0-206.77q-21.54 0-36.66-15.34Q428-458.68 428-480.21q0-21.54 15.34-36.66Q458.68-532 480.21-532q21.54 0 36.66 15.34Q532-501.32 532-479.79q0 21.54-15.34 36.66Q501.32-428 479.79-428Zm0-206.77q-21.54 0-36.66-15.34Q428-665.44 428-686.98t15.34-36.66q15.34-15.13 36.87-15.13 21.54 0 36.66 15.34Q532-708.09 532-686.56q0 21.54-15.34 36.67-15.34 15.12-36.87 15.12Z"/></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li v-for="image in rootImages" @click="openImageTab(image)" class="image-list-element root">
                                        <div class="image">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"/></svg>
                                            <p>{{ image.label }}</p>
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
                                            v-for="tab in allOpenTabs"
                                            :key="tab.id"
                                            @click="setActiveTab(tab.id)"
                                            :class="{ active: activeTab === tab.id, all: tab.type === 'all' }"
                                            draggable="true"
                                            @dragstart="dragStart($event, tab.id)"
                                            @dragover.prevent
                                            @dragenter.prevent
                                            @drop="drop($event, tab.id)"
                                        >
                                            <svg v-if="tab.type === 'folder'" class="tab-icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M180-200q-25.31 0-42.65-17.35Q120-234.69 120-260v-435.38q0-25.31 19.65-44.97Q159.31-760 184.62-760h199.23l80 80h311.53q20.7 0 36.12 11.19 15.42 11.19 21.58 28.81H447.77l-80-80H184.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v430.76q0 8.47 4.23 13.85 4.23 5.39 11.15 9.23L266-544.62h648.62l-90.7 302.24q-5.69 19.07-21.8 30.73Q786-200 766.15-200H180Zm37.08-40h564.46l78.92-264.62H296L217.08-240Zm0 0L296-504.62 217.08-240ZM160-640v-80 80Z"/></svg>
                                            <svg v-if="tab.type === 'image'" class="tab-icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM300-300h366.15L553.08-450.77 448.46-318.46l-70-84.62L300-300ZM200-200v-560 560Z"/></svg>
                                            <p v-if="tab.type !== 'all'">{{ tab.name }}</p>
                                            <svg v-if="tab.type === 'all'" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M100-560v-300h300v300H100Zm60-60h180v-180H160v180Zm-60 520v-300h300v300H100Zm60-60h180v-180H160v180Zm400-400v-300h300v300H560Zm60-60h180v-180H620v180Zm-60 520v-300h300v300H560Zm60-60h180v-180H620v180ZM340-620Zm0 280Zm280-280Zm0 280Z"/></svg>
                                            <button class="exit" @click.stop="closeTab(tab.id)" v-if="tab.type !== 'all'">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M256-181.91 181.91-256l224-224-224-224L256-778.09l224 224 224-224L778.09-704l-224 224 224 224L704-181.91l-224-224-224 224Z"/></svg>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="content-view">
                                <div v-if="getActiveTabType() === 'folder' || getActiveTabType() === 'all'" class="image-grid">
                                    <div v-for="image in getActiveTabImages()" :key="image.delete_hash" class="image-preview" @click="openImageTab(image)">
                                        <div class="preview-container">
                                            <div class="image-container">
                                                <img :src="image.url" :alt="image.label" />
                                            </div>
                                            <p>{{ image.label }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="getActiveTabType() === 'image'" class="image-detailed">
                                    <div class="large-image-container">
                                        <img :src="getActiveTabImage().url" :alt="getActiveTabImage().label" />
                                    </div>
                                    <div class="image-info">
                                        <h2 class="title">{{ getActiveTabImage().label }}</h2>
                                        <div class="group">
                                            <div class="text">
                                                <p>Width: <span>{{ getActiveTabImage().width }}px</span></p>
                                                <p>Height: <span>{{ getActiveTabImage().height }}px</span></p>
                                                <p>Upload Date: <span>{{ getActiveTabImage().upload_date }}</span></p>
                                            </div>
                                            <button @click="useSelectedImage" class="use-image-button">Use Image</button>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="no-tab">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
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
import DragAndDropImageUpload from '~/components/dragAndDropImageUpload.vue';
import { type Folder, type FrontendFolder, type FrontendPayload, type Image } from '~/types/database';

const { isAdmin } = useAuth();
const { 
    currentImageLabel,
    setCurrentUploadedImage,
    currentUploadedImageBlogUrl,
    selectedParentFolderName,
    selectedParentFolderId,
    selectedParentFolderIndex,
    clearCurrentUploadedImage,
    canUploadImage,
    uploadImage
} = await useImageManager();
 
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
const uploadingImage = ref(false);
const selectedImage = ref<File | null>(null);

const allImages = ref<Image[]>([]);
const rootImages = computed(() => folders.value.filter(folder => Number(folder.folder_id) === 0)[0].images);

const { data, error: fetchError } = await useFetch<Image[]>('/api/images');
allImages.value = data.value as Image[];


function toggleIsUploadImage() {
    uploadingImage.value = !uploadingImage.value;
}

const getAllFolderImages = computed(() => {
  return folders.value.flatMap(folder => folder.images);
});

function useSelectedImage() {
    const activeImage = getActiveTabImage();
    if (activeImage) {
        selectedImage.value = activeImage;
        closeImageManager();
        emit('image-selected', selectedImage.value);
    }
}

function handleDraggedFolderImage(image: File) {
    // selectedImage.value = image;
    uploadingImage.value = true;

    setCurrentUploadedImage(image);
}

async function handleImageUpload() {
    try {
        const result = await uploadImage();
        if (result.status === 'success') {
            console.log('Image uploaded successfully');

            if (result.parent_folder_frontend_index == undefined) {
                rootImages.value.push(result.image as Image);
                return
            }

            const newImage = result.image as Image;
            const folder_frontend_index: number = result.parent_folder_frontend_index;
            folders.value[folder_frontend_index].images.push(newImage);
        }
        else {
            console.error('Error uploading image:', result.error);
        }
    }
    catch (error) {
        console.error('Unexpected error:', error);
    }
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

function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}
// #endregion

// #region Tab Functionality --------------------------------------------
const allImagesOpen = ref(false);
const openTabs:Ref<Tab[]> = ref([]);

const newAllImagesTab = {
    id: -1,
    name: 'All Images',
    folderIndex: null,
    type: 'all' as const
};

const allOpenTabs = computed(() => {
    openTabs.value.push(newAllImagesTab);
    return openTabs.value;
});
const activeTab: Ref<null | number> = ref(null);
activeTab.value = newAllImagesTab.id;

const draggedTabId: Ref<null | number> = ref<number | null>(null);

interface Tab {
    id: number;
    name: string;
    folderIndex: number | null;
    type: 'folder' | 'image' | 'all';
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

function getActiveTabImages(): Image[] | null {
    const tab = openTabs.value.find(tab => tab.id === activeTab.value);
    if (!tab) return [];
    if (tab.name === 'All Images') {
        return allImages.value;
    } else if (tab.folderIndex !== null) {
        return folders.value[tab.folderIndex].images;
    }
    return [];
}

function dragStart(event: DragEvent, tabId: number) {
    if (tabId === -1) return;
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

const imageLabel = ref('');
function setCurrentImageLabel() {
    if (imageLabel.value === '') {
        currentImageLabel.value = null;
    }
    else {
        currentImageLabel.value = imageLabel.value;
    }
}

function handleFolderSetParentClick(folderIndex: number, folder_id: number, folderName: string) {
    if (folder_id === selectedParentFolderIndex.value) {
        selectedParentFolderName.value = null;
        selectedParentFolderId.value = null;
        selectedParentFolderIndex.value = null;
    }
    else {
        selectedParentFolderName.value = folderName;
        selectedParentFolderId.value = folder_id;
        selectedParentFolderIndex.value = folderIndex;
    }
}

function handleReturnToExplorer() {
    imageLabel.value = '';
    toggleIsUploadImage();
    clearCurrentUploadedImage();
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
    (e: 'image-selected', image: any): void
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

    .wrapper.drag-and-drop {
        z-index: 112;
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
                    line-height: 16px;
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

    .image-list-element {
        display: flex;
        height: 32px;
        padding-left: 44px;
        padding-right: 0;
        cursor: pointer;

        &.root {
            padding-left: 32px;

            .image {
                gap: 0.4rem;

                svg {
                    width: 18px;
                    height: 18px;
                }
            }
        }

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
                width: 17px;
                height: 17px;
            }

            p {
                font-size: 12px;
                color: var(--black2);
                user-select: none;
            }
        }

        .wrapper.main {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            flex: 1;

            .image-more-actions {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 26px;

                button {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 16px;
                    height: 20px;
                    padding: 0rem;
                    border: none;
                    background-color: transparent;
                    cursor: pointer;

                    svg {
                        position: absolute;
                        pointer-events: none;
                        user-select: none;
                        width: 18px;
                        height: 18px;
                    }

                }
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

    .content-view {
        .image-detailed {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .large-image-container {
                overflow: hidden;
                min-height: 300px;
                background-color: var(--black2);

                img {
                    width: 100%;
                    height: 100%;
                    padding: 2rem 1rem;
                    object-fit: contain;
                }
            }

            .image-info {
                display: flex;
                flex-direction: column;
                height: 100%;
                min-height: 100px;
                padding: 0.8rem;
                border-top: 1px solid var(--grey2);

                .title {
                    font-weight: 500;
                    line-height: 16px;
                    height: 16px;
                    margin-bottom: 12px;
                }

                .group {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-end;
                    height: 100%;
                    // max-height: 50px;

                    .text {
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        gap: 1rem;
                        padding-right: 0.8rem;

                        p {
                            font-size: 12px;
                            font-weight: 400;
                            color: var(--black2);
                            user-select: none;
                            height: auto;

                            span {
                                font-weight: 600;
                            }
                        }
                    }

                    .use-image-button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: var(--admin);
                        color: var(--background-color-secondary);
                        font-size: 16px;
                        border: none;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        height: 50px;
                        margin: 0;
                        width: 160px;
                        min-width: 160px;
                        transition: background-color 0.2s ease, color 0.2s ease;

                        &:hover {
                            background-color: var(--admin-dark);
                        }
                    }
                }
            }
        }
    }
}

.tabs-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60px;
    min-height: 60px;
    background-color: var(--white2);

    .extra-actions {
        height: 100%;
    }

    .tabs {
        height: 40px;
        min-height: 40px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        overflow-x: auto;
        scrollbar-width: thin;
    }

    .tab-icons {
        color: var(--black2);

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
        border: 1px solid var(--grey5);
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

        &:nth-child(2) {
            border-top-left-radius: 0.5rem;
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

    li.all {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-top: 1px solid var(--grey2);
        border-right: 1px solid var(--grey2);
        border-top-right-radius: 0.5rem;
        width: 50px;
        padding: 0rem;
        margin-right: 20px;

        svg {
            width: 20px;
            height: 20px;
            fill: var(--black2);
        }

        &:last-child {
            border-right: 1px solid var(--grey2);
        }
    }
}

.content-view {
    height: calc(100% - 60px);
    border-top: 1px solid var(--grey2);
    overflow-y: auto;
    scrollbar-width: thin;
    border-bottom-right-radius: 0.5rem;

    .no-tab {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: var(--white2);
        color: var(--grey4);

        p {
            user-select: none;
        }

        .absolute {
            padding: 1rem;
            position: absolute;
        }
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(166px, 1fr));
        gap: 1rem 0rem;
        padding: 1.5rem 1rem;
        padding-bottom: 6rem;

        .preview-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--background-color-secondary);
            cursor: pointer;
            gap: 0.5rem;
            padding: 0.5rem 0rem;
            transition: background-color 0.2s ease, border 0.2s ease;
            will-change: background-color, border;
            
            p {
                font-size: 12px;
                color: var(--grey2);
                user-select: none;
            }
            
            &:hover {
                border: 1px solid var(--white2);
                background-color: var(--off-white);
            }
        }
        
        .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 148px;
            height: 148px;
            padding: 0.8rem;
            border-radius: 4px;
            background-color: var(--off-white);
            border: 1px solid var(--grey5);
            transition: background-color 0.2s ease, border 0.2s ease;
            will-change: background-color, border;

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

.image-upload-window {
    display: flex;
    flex-direction: column;

    .upload-form {
        display: flex;
        flex-direction: column;
        // padding: 1rem;
        width: 250px;
        min-width: 200px;
        height: 100%;
        border-right: 1px solid var(--grey2);

        .upload-header {
            height: auto;

            h2 {
                display: flex;
                align-items: center;
                height: 40px;
                min-height: 40px;
                font-size: 12px;
                font-weight: 500;
                padding: 0.5rem 0.8rem;
                border-top: 1px solid var(--grey2);
                border-bottom: 1px solid var(--grey2);
                box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
            }

            .button-container {
                height: 60px;
                padding: 0.8rem;
                background-color: var(--white2);
            }

            .return-main-screen {
                width: 100%;
                height: 34px;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0.4rem 0.6rem;
                padding-right: 0.8rem;
                gap: 0.5rem;
                cursor: pointer;
                background-color: var(--background-color-secondary);
                border: 1px solid var(--grey2);
                border-radius: 0.5rem;

                &:hover {
                    background-color: var(--off-white);
                }

                svg {
                    width: 18px;
                    height: 18px;
                    fill: var(--black2);
                }

                p {
                    font-size: 12px;
                    font-weight: 400;
                    color: var(--black2);
                }
            }
        }
    }

    .drop-zone {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

    .input-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: thin;

        .input-group.main {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            height: 100%;
            overflow-y: auto;
            scrollbar-width: thin;

            .options-wrapper {
                display: flex;
                flex-direction: column;
                // padding: 0.8rem;

                .option-group {
                    padding: 0.8rem;
                    // padding-top: 1.4rem;
                }

                input {
                    font-family: 'Inter', sans-serif;
                    width: 100%;
                    padding: 0.4rem 0.8rem;
                    border: 1px solid var(--grey2);
                    border-radius: 0.5rem;
                    font-size: 14px;

                    &:focus {
                        outline: none;
                        border: 1px solid var(--admin);
                    }
                }

            }

            .selection-wrapper {
                padding: 0.8rem;
                padding-bottom: 2.2rem;
                height: 100%;

                .folders-list.folder-selection-list {
                    border-radius: 0.5rem;
                    border: 1px solid var(--grey2);
                    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
                    height: auto;
                    padding-bottom: 32px;

                    li.folder.selection-folder {
                        position: relative;
                        background-color: var(--background-color-secondary);
                        z-index: 111;
                        height: 32px;

                        &.selected {
                            .folder-more-actions {
                                .more-actions {
                                    background-color: var(--admin);
                                    border: 1px solid var(--admin);
                                }
                            }
                        }
                        
                        &:last-of-type {
                            z-index: 110;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        
                        .folder-label {
                            border-bottom: 1px solid var(--grey2);
                            height: 100%;

                            &:hover {
                                border-bottom: 1px solid var(--grey2);
                            }

                            .folder-label-main {
                                padding-left: 0.8rem;
                                min-height: 32px;
                                width: 100%;
                            }
                        }

                        .folder-more-actions {
                            width: auto;
                            min-width: auto;
                            padding: 0rem 0.4rem;
                            padding-right: 0.8rem;

                            .more-actions {
                                height: 14px;
                                width: 14px;
                                border: 1px solid var(--grey2);
                                background-color: var(--white2);
                                border-radius: 50%;
                                transition: border-color 0.2s ease, background-color 0.2s ease;
                            }
                        }
                    }
                }
            }

            label {
                width: 100%;
                display: flex;
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 0.4rem;
                white-space: nowrap;
                align-items: flex-end;

                strong {
                    margin-left: 0.6rem;
                    font-weight: 400;
                    width: 100%;
                    white-space: wrap;
                }
            }
        }

        .input-group.submit {
            height: 60px;
            min-height: 60px;
            padding: 0.8rem 0.8rem;
            border-top: 1px solid var(--grey2);

            button {
                font-family: 'Inter', sans-serif;
                font-weight: 500;
                width: 100%;
                height: 100%;
                border-radius: 0.5rem;
                border: none;
                background-color: var(--grey2);
                color: var(--background-color-secondary);
                box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
                transition: background-color 0.2s ease, color 0.2s ease;
                pointer-events: none;

                &.enabled {
                    background-color: var(--admin);
                    cursor: pointer;
                    pointer-events: auto;

                    &:hover {
                        background-color: var(--admin-dark);
                    }
                }
            }
        }
    }
}

svg {
    fill: var(--black2);
}
</style>