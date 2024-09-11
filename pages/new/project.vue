<template>
    <section class="new-project-hero component" style="justify-content: center;">
        <div class="container">
            <h1 class="header">New Project</h1>
            <button class="submit">Publish</button>
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
                        <div class="status-list">
                            <button 
                                v-for="status in ProjectStatuses" 
                                :key="status.name"
                                @click="selectStatus(status.name)"
                                class="project-status-label"
                                :class="[{ 'selected': mainFields.status.value === status.name },
                                            status.name.replace(' ', '-')
                                        ]"
                                type="button"
                            >
                                {{ formatStatusName(status.name) }}
                            </button>
                            <button 
                                @click="removeStatus()"
                                class="project-status-label remove-status none"
                                :class="{ 'selected': mainFields.status.value === '' }"
                                type="button"
                            >
                                No status
                            </button>
                        </div>
                        <!-- <input class="input-text" v-model="mainFields.status.value" id="status" type="text" placeholder="" /> -->
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
                                    :imageUrl="profileImage"
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
                        <label for="cover-image">Cover Image</label>
                        <DragAndDropImageUpload
                            @image-selected="handleCoverImageSelected"
                            @image-removed="handleCoverImageRemoved"/>
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
    <ImageManager ref="imageManagerRef" @image-selected="onImageSelected" />
</template>

<script setup lang="ts">
import { ValidationError } from '~/types/validation';
import { type ProjectSettingField, ProjectStatuses } from '~/types/project';
import type { User, Image } from '~/types/database';
import { formatDateDDMMYYY } from '~/utils/date';
import ImageManager from '~/components/popups/manager/image.vue';

const { getUserInfo } = useAuth();
definePageMeta({
    middleware: ['admin']
})

//Image Manager
const imageManagerRef = ref(null);
provide('imageManagerRef', imageManagerRef);

const onImageSelected = (image: Image) => {
  // Handle image selection for the parent component
  // ...
};

// User Info
const userInfo: Ref<User | null | undefined> = ref(await getUserInfo());
const profileImage = userInfo?.value?.profile_image;
    
// General Settings
const createdDateIso = new Date().toISOString();
const createdDate = formatDateDDMMYYY(createdDateIso);

const pageContent = ref(``);


// Main Settings
const mainFields = reactive({
    title: { value: '', error: null, maxLength: 100 },
    subtitle: { value: '', error: null, maxLength: 100 },
    created_date: { value: createdDate, error: null } as ProjectSettingField,
    status: { value: 'draft', error: null } as ProjectSettingField,
    author_name: { value: `${userInfo?.value?.first_name} ${userInfo?.value?.last_name}`, error: null, maxLength: 50 },
    author_image: { value: null as string | null, error: null } as ProjectSettingField,
    cover_image: { value: false, error: null } as ProjectSettingField,
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

const handleCoverImageSelected = () => {
    mainFields.cover_image.value = true;
    mainFields.cover_image.error = null;
};

const handleCoverImageRemoved = () => {
    mainFields.cover_image.value = false;
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

// Draft saving and loading:
const saveDraft = () => {
    const draft = {
        pageContent: pageContent.value,
        mainFields,
        seoFields,
        userInfo: userInfo,
    };

    localStorage.setItem('projectDraft', JSON.stringify(draft));
};

const loadDraft = () => {
    const savedDraft = localStorage.getItem('projectDraft');
    if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        pageContent.value = draft.pageContent;
        Object.assign(mainFields, draft.mainFields);
        Object.assign(seoFields, draft.seoFields);
        userInfo.value = draft.userInfo;
    }
};

const checkForDraft = () => {
  const savedDraft = localStorage.getItem('projectDraft');
  if (savedDraft) {
    const confirmLoad = window.confirm(`An unsaved draft was found. Would you like to load it?`);
    if (confirmLoad) {
      loadDraft();
    } else {
      localStorage.removeItem('projectDraft');
    }
  }
};

watch([pageContent, mainFields, seoFields, userInfo], saveDraft, { deep: true });

onMounted(() => {
  checkForDraft();
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

    @media (max-width: 768px) {
        font-size: clamp(3rem, 8vw, 4rem);
    }
}

section.new-project-hero {
    margin-top: 14rem;
    margin-bottom: 4rem;
    background-color: var(--background-color-main);
    padding: 0rem 1rem 0rem 1rem;

    @media (max-width: 768px) {
        margin-top: clamp(7rem, 20vw, 14rem);
    }

    .container {
        flex-direction: row;
        justify-content: space-between;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
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

button.submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    padding: 0.5rem 1rem;
    background-color: var(--admin);
    color: var(--background-color-secondary);
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    will-change: background-color, color;

    &:hover {
        background-color: var(--admin-dark);
    }

    @media (max-width: 768px) {
        height: 3.6rem;
        width: 100%;
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

.status-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 0.5rem;

    .project-status-label {
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
        will-change: background-color, color;
        min-height: 32px;
        background-color: #5c5c5c19;
        border: 1px solid #5c5c5c5e;
        color: #68686883;

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

        &.proposed {
            &:hover, &.selected {
                background-color: #7318b825;
                border: 1px solid #6b28b8a9;
                color: #6f1aa19a;
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

        &.selected {
            background-color: var(--admin);
            border: 1px solid var(--admin);
            color: var(--background-color-secondary);
        }
    }
}
</style>

<style lang="scss">
.project-status-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    text-align: center;
    padding: 0.4rem 0.8rem;
    width: auto;
    border-radius: 8px;

    &.completed, &.finished {
        background-color: #4987102b;
        border: 1px solid #456825de;
        color: #39651fd1;
    }

    &.in-progress {
        background-color: #388bc735;
        border: 1px solid #3068a8de;
        color: #3364a8d1;
    }

    &.ongoing {
        background-color: #1e9eff26;
        border: 1px solid #116db4c7;
        color: #1165a9bc;
    }

    &.active {
        background-color: #0eadb62a;
        border: 1px solid #0d8d86ad;
        color: #0c7684be;
    }
    
    &.pending {
        background-color: #b8681825;
        border: 1px solid #c2710fdb;
        color: #a76413ca;
    }

    &.proposed {
        background-color: #7318b825;
        border: 1px solid #6b28b8a9;
        color: #6f1aa19a;
    }
    
    &.archived, &.draft {
        background-color: #40404025;
        border: 1px solid #545454db;
        color: #3b3b3bca;
    }

    &.cancelled {
        background-color: #ab351815;
        border: 1px solid #8e351fd2;
        color: #8e351fd0;
    }
}
</style>