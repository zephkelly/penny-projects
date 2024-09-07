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
                <div class="wrapper author">
                    <div class="group">
                        <div class="field avatar">
                            <label for="subtitle">Author Image</label>
                            <div class="preview-wrapper">
                                <DragAndDropImageUpload 
                                    :flexToParent="true"
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
        :content="pageContent"
        :pageRelatedSettings="pageRelatedSettings"
        style="justify-content: center;"/>
</template>

<script setup lang="ts">
import { ValidationError } from '~/types/validation';
import { type ProjectSettingField } from '~/types/project';
import type { User } from '~/types/database';

import { formatDateDDMMYYY } from '~/utils/date';

const { getUserInfo } = useAuth();

definePageMeta({
    middleware: ['admin']
})

const pageContent = ref(`
  <p></p>
`);


const userInfo: User | null | undefined = await getUserInfo();

const profileImage = userInfo?.profile_image;

const createdDateIso = new Date().toISOString();
const createdDate = formatDateDDMMYYY(createdDateIso);

// Main Settings
const mainFields = reactive({
    title: { value: '', error: null, maxLength: 100 },
    subtitle: { value: '', error: null, maxLength: 100 },
    created_date: { value: createdDate, error: null } as ProjectSettingField,
    author_name: { value: `${userInfo?.first_name} ${userInfo?.last_name}`, error: null, maxLength: 50 },
    author_image: { value: profileImage, error: null } as ProjectSettingField,
    cover_image: { value: false, error: null } as ProjectSettingField,
});


const mainFieldCount = computed(() => Object.values(mainFields).length);

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
    return getCompletedFieldsCount(mainFields);
});

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

function getCompletedFieldsCount(fields: Object): number {
    return Object.values(fields).filter(field => {
        return field.error === null && (field.value !== false && field.value !== '');
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
    social_facebook: userInfo?.social_facebook,
    social_instagram: userInfo?.social_instagram,
}));
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
</style>

<style lang="scss">
.field .author {
    .image-preview-container {
        height: 100%;
    }
}
</style>