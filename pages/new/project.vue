<template>
    <section class="new-project-hero component" style="justify-content: center;">
        <div class="container">
            <h1 class="header">New Project</h1>
            <div class="project-buttons">
                <button 
                    class="submit draft"
                    :class="{ enabled: true }"
                    @click.prevent="handleProjectDraftSubmit"
                    :disabled="draftSubmitEnabled"
                    >
                        <svg v-if="uploadingDraftProject" class="spinner" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>
                        <p v-else>Save Draft</p>
                </button>
                <button
                    class="submit publish"
                    :class="{ enabled: hasCompletedAllFields }"
                    @click.prevent="handleProjectSubmit"
                    :disabled="!hasCompletedAllFields"
                    title="All settings must be completed to publish."
                    >
                        <svg v-if="uploadingPublishedProject" class="spinner" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>
                        <p v-else>Publish</p>
                </button>
            </div>
        </div>
    </section>
    <section class="metadata component">
        <Expander
            :startExpanded="true"
            title="Main Settings"
            :totalOptions="mainFieldCount" 
            :completedOptions="completedMainFields">
            <form class="container">
                <div class="wrapper title date submit">
                    <div class="group">
                        <div class="field title">
                            <label for="title">Title</label>
                            <input class="input-text" v-model="mainFields.title.value" id="title" type="text" placeholder="" required />
                        </div>
                        <div class="field date">
                            <label for="date">Created Date</label>
                            <input class="input-text" v-model="mainFields.created_date.value" id="date" type="text" placeholder="dd/mm/yyyy" required />
                        </div>
                    </div>
                </div>
                <div class="wrapper subtitle">
                    <div class="field subtitle">
                        <label for="subtitle">Subtitle</label>
                        <input class="input-text" v-model="mainFields.subtitle.value" id="subtitle" type="text" placeholder="" required />
                    </div>
                </div>
                <div class="wrapper status">
                    <div class="field status">
                        <label for="status">Status</label>
                        <div class="project-status-list">
                            <span 
                                v-for="status in ProjectStatuses" 
                                :key="status.name"
                                @click="selectStatus(status.name)"
                                class="project-status-label empty"
                                :class="[{ 'selected': mainFields.status.value === status.name },
                                            status.name.replace(' ', '-')
                                        ]"
                                type="button"
                            >
                                {{ formatStatusName(status.name) }}
                            </span>
                            <span 
                                @click="removeStatus()"
                                class="project-status-label remove-status none"
                                :class="{ 'selected': mainFields.status.value === '' }"
                                type="button"
                            >
                                No status
                            </span>
                        </div>
                    </div>
                </div>
                <div class="wrapper author">
                    <div class="group">
                        <div class="field avatar">
                            <label for="subtitle">Author Image</label>
                            <div class="preview-wrapper">
                                <DragAndDropImageUpload 
                                    flexToParent
                                    previewFlexToParent
                                    :imageUrl="authorImage"
                                    @image-selected="handleAuthorImageSelected"
                                    @image-removed="handleAuthorImageRemoved"
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label for="author-name">Author Name</label>
                            <input class="input-text author-name" v-model="mainFields.author_name.value" ref="authorNameInput" id="author-name" type="text" placeholder="" required />
                        </div>
                    </div>
                </div>
                <div class="wrapper cover-image">
                    <div class="field">
                        <div class="label-container" :class="{ 'is-expanded': isCoverExpanded }" @click.prevent="isCoverExpanded = !isCoverExpanded">
                            <label for="cover-image">Cover Image</label>
                            <button class="expander-button">
                                <svg :class="{ 'is-expanded': isCoverExpanded }" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="preview-container" :class="{ 'is-expanded': isCoverExpanded }">
                            <ImageSelectionPreview :imageUrl="coverImage" @image-selected="handleCoverImageSelected" @image-removed="handleCoverImageRemoved">
                                Click to select a cover image
                            </ImageSelectionPreview>
                        </div>
                    </div>
                </div>
            </form>
        </Expander>
        <Expander
            title="SEO Settings"
            :totalOptions="seoFieldCount" 
            :completedOptions="completedSEOFields">
            <form class="container">    
                <div class="wrapper url">
                    <div class="field">
                        <label for="url">URL Slug</label>
                        <input class="input-text" v-model="seoFields.slug.value" id="url" type="text" placeholder="example-project-slug" required />
                    </div>
                </div>
                <div class="wrapper seo-title">
                    <div class="field">
                        <label for="seo-title">SEO Title</label>
                        <input class="input-text" v-model="seoFields.seo_title.value" ref="seoTitleInput" id="seo-title" type="text" placeholder="" required />
                    </div>
                </div>
                <div class="wrapper subtitle">
                    <div class="field">
                        <label for="meta-description">Meta Description</label>
                        <input class="input-text" v-model="seoFields.meta_description.value" ref="metaDescriptionInput" id="meta-description" type="text" placeholder="" required />
                    </div>
                </div>
            </form>
        </Expander>
    </section>
    <tipTapEditor
        v-model:content="pageContent"
        :pageRelatedSettings="pageRelatedSettings"
        style="justify-content: center;"/>
    <ImageManager ref="imageManagerRef" />
</template>

<script setup lang="ts">
import { ValidationError } from '~/types/validation';
import { type ProjectSettingField, type ProjectStatus, ProjectStatuses } from '~/types/project';
import type { User, Image, Project } from '~/types/database';
import { formatDateDDMMYYY } from '~/utils/date';
import ImageManager from '~/components/popups/manager/image.vue';
import { useImageManager } from '~/composables/useImageManager';

const { getUserInfo } = useAuth();
definePageMeta({
    middleware: ['admin']
})

const { showToast } = useToast()

//Image Manager
const { imageManagerPopupOpen, selectImage } = await useImageManager();

const isCoverExpanded = ref(true);
const coverImage = computed(() => mainFields.cover_image.value as string | null);

// User Info
const userInfo: Ref<User | null | undefined> = ref(await getUserInfo());
const authorImage = ref(userInfo?.value?.profile_image);
    
// General Settings
const createdDateIso = new Date().toISOString();
const createdDate = formatDateDDMMYYY(createdDateIso);

const pageContent = ref(``);
const projectId = ref<number | null>(null);

// Main Settings
const mainFields = reactive({
    title: { value: '', error: null, maxLength: 100 },
    subtitle: { value: '', error: null, maxLength: 100 },
    created_date: { value: createdDate, error: null } as ProjectSettingField,
    status: { value: 'draft', error: null } as ProjectSettingField,
    author_name: { value: `${userInfo?.value?.first_name} ${userInfo?.value?.last_name}`, error: null, maxLength: 50 },
    author_image: { value: null as string | null, error: null } as ProjectSettingField,
    cover_image: { value: '', error: null } as ProjectSettingField,
});

const mainIgnoreFields = ['status'];
const mainFieldCount = computed(() => Object.keys(mainFields).filter(key => !mainIgnoreFields.includes(key)).length);

const validateMainForm = (field: ProjectSettingField) => {
    if ('maxLength' in field === false) return;

    const result = validator.validateField(field.value as string, field.maxLength as number);

    if (field === mainFields.title || field === mainFields.author_name) {
        result.value = validator.sanitiseDoubleSpaces(result.value);
    }

    field.value = result.value;
    field.error = result.error || null;
};

Object.values(mainFields).forEach(field => {
    watch(() => field.value, () => validateMainForm(field));
});

const completedMainFields = computed(() => {
    return getCompletedFieldsCount(mainFields, mainIgnoreFields);
});

const selectStatus = (status: string) => {
    mainFields.status.value = status;
};

const removeStatus = () => {
    mainFields.status.value = '';
};

const formatStatusName = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const handleAuthorImageSelected = (file: File) => {
    mainFields.author_image.value = URL.createObjectURL(file);
    mainFields.author_image.error = null;
};

const handleAuthorImageRemoved = () => {
    mainFields.author_image.value = '';
    mainFields.author_image.error = ValidationError.REQUIRED;
};

const handleCoverImageSelected = (image: Image) => {
    const image_url = image.url;
    const image_id = image.image_id;


    mainFields.cover_image.value = image_url;
    mainFields.cover_image.id = image_id;
    mainFields.cover_image.error = null;
};

const handleCoverImageRemoved = () => {
    mainFields.cover_image.value = '';
    mainFields.cover_image.error = ValidationError.REQUIRED;
};

// SEO Settings
const seoFields = reactive({
    slug: { value: '', error: null, maxLength: 100 },
    seo_title: { value: '', error: null, maxLength: 60 },
    meta_description: { value: '', error: null, maxLength: 160 },
});

const seoFieldCount = computed(() => Object.values(seoFields).length);

const validateSEOForm = (field: ProjectSettingField) => {
    if ('maxLength' in field === false) return;

    const result = validator.validateField(field.value as string, field.maxLength as number);

    if (field === seoFields.slug) {
        result.value = validator.slugify(result.value);
    }

    if (field === seoFields.seo_title || field === seoFields.meta_description) { 
        result.value = validator.sanitiseDoubleSpaces(result.value);
    }

    field.value = result.value;
    field.error = result.error || null;
};

Object.values(seoFields).forEach(field => {
    watch(() => field.value, () => validateSEOForm(field));
});

const completedSEOFields = computed(() => {
    return getCompletedFieldsCount(seoFields);
});

function getCompletedFieldsCount(fields: Record<string, ProjectSettingField>, ignore?: string[]): number {
    return Object.entries(fields).filter(([key, field]) => {
        if (ignore && ignore.includes(key)) {
            return false;
        }

        return field.error === null && field.value !== false && field.value !== '';
    }).length;
}

const defaultValues = {
    title: 'Your New Project Title',
    subtitle: 'Write a longer, attention-grabbing subtitle here',
    createdDate: '',
    authorName: '',
};

const pageRelatedSettings = computed(() => reactive({
    title: mainFields.title.value === '' ? defaultValues.title : mainFields.title.value,
    subtitle: mainFields.subtitle.value === '' ? defaultValues.subtitle : mainFields.subtitle.value,
    created_date: mainFields.created_date.value,
    author_name: mainFields.author_name.value,
    author_image: mainFields.author_image.value,
    social_facebook: userInfo?.value?.social_facebook,
    social_instagram: userInfo?.value?.social_instagram,
    status: mainFields.status.value,
}));

const hasCompletedAllFields = computed(() => {
    return completedMainFields.value === mainFieldCount.value && completedSEOFields.value === seoFieldCount.value;
});

// Draft saving and loading:
const saveLocalDraft = () => {
    const draft = {
        pageContent: pageContent.value,
        mainFields,
        seoFields,
        userInfo: userInfo,
        project_id: projectId.value,
    };

    localStorage.setItem('projectDraft', JSON.stringify(draft));
};

const loadLocalDraft = () => {
    const savedDraft = localStorage.getItem('projectDraft');
    if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        pageContent.value = draft.pageContent;
        Object.assign(mainFields, draft.mainFields);
        Object.assign(seoFields, draft.seoFields);
        userInfo.value = draft.userInfo;
        projectId.value = draft.project_id;
    }
};

const checkForLocalDraft = () => {
    const savedDraft = localStorage.getItem('projectDraft');
    if (savedDraft) {

        const confirm = window.confirm('A draft was found. Would you like to load it?');

        if (confirm) {
            loadLocalDraft();
        } else {
            clearLocalDraft();
        }
    }
};

const clearLocalDraft = () => {
    localStorage.removeItem('projectDraft');
};

const draftSubmitEnabled = ref(false);
const uploadingDraftProject = ref(false);
const handleProjectDraftSubmit = async () => {
    uploadingDraftProject.value = true;

    const newProject = {
        project_id: projectId.value || null,
        title: mainFields.title.value,
        subtitle: mainFields.subtitle.value,
        created_date: mainFields.created_date.value as string,
        status: mainFields.status.value as ProjectStatus,
        author_name: mainFields.author_name.value,
        author_image_url: mainFields.author_image.value as string,
        cover_image_id: mainFields.cover_image.id as number,
        slug: seoFields.slug.value,
        seo_title: seoFields.seo_title.value,
        seo_meta_description: seoFields.meta_description.value,
        published: false,
        content: pageContent.value,
    };

    try {
        const response = await $fetch('/api/upload/project', {
            method: 'POST',
            body: { project: newProject }
        });

        if (response.status !== 200) {
            uploadingDraftProject.value = false;
            window.alert('There was an error saving the draft. Please try again.');
            return;
        }

        const project_id = response.data.project_id;
        projectId.value = project_id;

        uploadingDraftProject.value = false;

        clearLocalDraft();
        showToast('Draft saved successfully!');
    }
    catch (error) {
        uploadingDraftProject.value = false;
        window.alert('There was an error saving the draft. Please try again.');
    }
};

const uploadingPublishedProject = ref(false);
const handleProjectSubmit = async () => {
    uploadingPublishedProject.value = true;

    const newProject = {
        project_id: projectId.value || null,
        title: mainFields.title.value,
        subtitle: mainFields.subtitle.value,
        created_date: mainFields.created_date.value as string,
        status: mainFields.status.value as ProjectStatus,
        author_name: mainFields.author_name.value,
        author_image_url: mainFields.author_image.value as string,
        cover_image_id: mainFields.cover_image.id as number,
        slug: seoFields.slug.value,
        seo_title: seoFields.seo_title.value,
        seo_meta_description: seoFields.meta_description.value,
        published: true,
        content: pageContent.value,
    };

    try {
        const response = await $fetch('/api/upload/project', {
            method: 'POST',
            body: { project: newProject }
        });

        if (response.status !== 200) {
            uploadingPublishedProject.value = false;
            window.alert('There was an error saving the project. Please try again.');
            return;
        }

        const project_id = response.data.project_id;
        projectId.value = project_id;

        uploadingPublishedProject.value = false;

        clearLocalDraft();
        showToast('Project published successfully!');
    }
    catch (error) {
        uploadingPublishedProject.value = false;
        window.alert('There was an error saving the project. Please try again.');
    }
};

watch([pageContent, mainFields, seoFields, userInfo, projectId], saveLocalDraft, { deep: true });

onMounted(() => {
    checkForLocalDraft();
    getUserInfo().then(info => {
        userInfo.value = info;
        if (!mainFields.author_name.value) {
            mainFields.author_name.value = `${info?.first_name} ${info?.last_name}`;
        }
        if (!mainFields.author_image.value) {
            mainFields.author_image.value = info?.profile_image || null;
        }
    });
});
</script>

<style lang="scss" scoped>
.header {
    font-family: 'Nunito', sans-serif;
    font-size: 3.6rem;
    letter-spacing: 0.3rem;
    font-weight: 700;
    color: var(--text-color-main);
    text-transform: uppercase;
    margin-top: 14rem;

    @media (max-width: 768px) {
        font-size: clamp(3rem, 8vw, 4rem);
    }
}

section.new-project-hero {
    margin-bottom: 4rem;
    background-color: var(--background-color-main);
    padding: 0rem 1rem 0rem 1rem;

    @media (max-width: 768px) {
        margin-top: clamp(7rem, 20vw, 14rem);
    }

    .container {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        @media (max-width: 768px) {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 1rem;
        }
    }

    .project-buttons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        height: 50px;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
            width: 100%;

            .submit {
                height: 44px;
            }
        }

        .submit {
            font-family: 'Inter', sans-serif;
            background-color: var(--grey5);
            border: 1px solid var(--admin-dark);
            border-radius: 8px;
            cursor: pointer;
            min-width: 60px;
            padding: 0rem 1.5rem;
            font-size: 0.9rem;
            background-color: var(--grey2);
            color: var(--background-color-secondary);
            transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;


            &.publish {
                cursor: not-allowed;
                opacity: 0.5;
                min-width: 100px;

                &.enabled {
                    cursor: pointer;
                    pointer-events: all;
                    background-color: var(--admin);
                    color: var(--background-color-secondary);
                    opacity: 1;

                    &:hover {
                        background-color: var(--admin-dark);
                    }
                }
            }

            &.draft {
                border: 1px solid var(--admin);
                background-color: var(--grey5);
                color: var(--black2);
                cursor: not-allowed;
                opacity: 0.5;
                min-width: 122px;

                &.enabled {
                    background-color: var(--admin-highlight);
                    opacity: 1;
                    cursor: pointer;

                    &:hover {
                        background-color: var(--admin-highlight-hover);
                    }
                }
            }

            .spinner {
                animation: spin 1s linear infinite;
            }

            
        }
    }
}

.header {
    color: var(--admin);
}

.metadata {
    margin-bottom: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


form.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.wrapper {
    display: flex;
    flex-direction: row;
}

.wrapper.title {
    justify-content: flex-start;

    .group {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 100%;

        @media (max-width: 550px) {
            flex-direction: column;
        }
    }

    .title {
        width: 100%;
    }

    .date {
        width: auto;
    }
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    &.description {
        height: 100px;
        width: 100%;

        textarea {
            height: 100%;
            flex: 1;
            min-width: calc(100% - 4px);
            max-width: calc((100% - 4px));
        }
    }

    &.avatar {
        width: 150px;
        flex-shrink: 0;

        .preview-wrapper {
            width: 150px;
            height: 150px;
            border-radius: 0.5rem;
            overflow: hidden;
        }
    }
}

input,
textarea {
    margin: 2px;
    font-size: 1rem;
}

input:focus,
textarea:focus {
    outline: 1px solid var(--admin);
}

input.author-name {
    max-height: 38px;
}

.wrapper.cover-image {
    .field {
        width: 100%;
    }

    .background {
        background-color: var(--background-color-secondary);
        padding: 1rem;
        border-radius: 0.5rem;
    }

    label {
        pointer-events: none;
        user-select: none;
        cursor: pointer;
    }

    .label-container {
        display: flex;
        flex-direction: row;
        align-items: center;  
        gap: 1rem;
        height: 50px;
        background-color: var(--background-color-secondary);
        cursor: pointer;
        padding: 0rem 2rem;
        border: 1px solid transparent;
        border-left: none;
        border-right: none;
        transition: background-color 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
        will-change: background-color, padding;
        border-radius: 0.5rem;


        &.is-expanded {
            background-color: transparent;
            padding: 0rem;
            width: 100%;
            border-radius: 0;

            &:hover {
                border-color: var(--grey5);
            }
        }

        .expander-button {
            display: flex;
            align-items: center;
            background-color: transparent;
            border: none;
            gap: 0.5rem;
            padding: 0rem;

            svg {
                user-select: none;
                transition: transform 0.3s ease;
                will-change: transform;
                transform: rotate(-90deg);
                cursor: pointer;

                &.is-expanded {
                    transform: rotate(0deg);
                }
            }
        }
    }

    .preview-container {
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease;
        border-radius: 0.5rem;

        &.is-expanded {
            height: 400px;
        }
    }
}

.wrapper.author {
    .group {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 100%;

        @media (max-width: 550px) {
            flex-direction: column;
        }
    }
}

.input-text {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--admin);
    transition: border-color 0.3s ease;
    will-change: border-color;
}

.project-status-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 0.5rem;
}
</style>

<style lang="scss">
.project-status-label {
    font-family: 'Nunito', sans-serif;
    border-radius: 4px;
    cursor: pointer;
    padding: 2px 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
    will-change: background-color, color;
    min-height: 32px;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.empty {
        background-color: #5c5c5c19;
        border: 1px solid #5c5c5c5e;
        color: #68686883;
    }

    // &.selected {
    //     background-color: var(--admin);
    //     border: 1px solid var(--admin);
    //     color: var(--background-color-secondary);
    // }

    &.none {
        background-color: #00000026;
        border: 1px solid #0b0b0b26;
        color: #00000049;

        &.selected, &:hover {
            background-color: #cc1f1f42;
            border: 1px solid #960a0a7d;
            color: #b71010b9;
        }

        &.selected:hover {
            background-color: #94131342;
            border: 1px solid #5b07077d;
            color: #6d0909b9;
        }
    }

    &.completed, &.finished {
        &:hover, &.selected {
            background-color: #4987102b;
            border: 1px solid #456825de;
            color: #39651fd1;
        }
    }

    &.in-progress {
        &:hover, &.selected {
            background-color: #388bc735;
            border: 1px solid #3068a8de;
            color: #3364a8d1;
        }
    }

    &.ongoing {
        &:hover, &.selected {
            background-color: #1e9eff26;
            border: 1px solid #116db4c7;
            color: #1165a9bc;
        }
    }

    &.active {
        &:hover, &.selected {
            background-color: #0eadb62a;
            border: 1px solid #0d8d86ad;
            color: #0c7684be;
        }
    }

    &.pending {
        &:hover, &.selected {
            background-color: #c4722125;
            border: 1px solid #ca7b1adb;
            color: #be7012ca;
        }
    }

    &.proposed, &.needs-funding {
        &:hover, &.selected {
            background-color: #7318b825;
            border: 1px solid #6b28b8a9;
            color: #6f1aa19a;
        }

        &.small {
            background-color: #7318b812;
        }
    }

    &.draft {
        margin-right: 1rem;

        &:hover, &.selected {
            background-color: #40404025;
            border: 1px solid #545454db;
            color: #3b3b3bca;
        }
    }

    &.cancelled, &.archived {
        &:hover, &.selected {
            background-color: #ab351815;
            border: 1px solid #8e351fd2;
            color: #8e351fd0;
        }
    }

    &.cancelled {
        margin-right: 1rem;
    }

    &.small {
        font-size: 0.8rem;
        padding: 6px 8px;
        min-height: auto;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>