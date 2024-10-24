<template>
    <Expander
        :startExpanded="true"
        title="Main Settings"
        :totalOptions="mainFieldCount"
        :completedOptions="completedMainFields"
    >
        <form class="container">
            <div class="wrapper title date submit">
                <div class="group">
                    <div class="field title">
                        <label for="title">Title</label>
                        <input
                            class="input-text"
                            v-model="mainFields.title.value"
                            id="title"
                            type="text"
                            placeholder=""
                            required
                        />
                    </div>
                    <div class="field date">
                        <label for="date">Created Date</label>
                        <input
                            class="input-text"
                            v-model="mainFields.created_date.value"
                            id="date"
                            type="text"
                            placeholder="dd/mm/yyyy"
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="wrapper subtitle">
                <div class="field subtitle">
                    <label for="subtitle">Subtitle</label>
                    <input 
                        class="input-text" 
                        v-model="mainFields.subtitle.value" 
                        id="subtitle" 
                        type="text" 
                        placeholder="" 
                        required 
                    />
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
                            :class="[
                                { 'selected': mainFields.status.value === status.name },
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
                        <input 
                            class="input-text author-name" 
                            v-model="mainFields.author_name.value" 
                            id="author-name" 
                            type="text" 
                            placeholder="" 
                            required 
                        />
                    </div>
                </div>
            </div>
            <div class="wrapper cover-image">
                <div class="field">
                    <div 
                        class="label-container" 
                        :class="{ 'is-expanded': isCoverExpanded }" 
                        @click.prevent="isCoverExpanded = !isCoverExpanded"
                    >
                        <label for="cover-image">Cover Image</label>
                        <button class="expander-button">
                            <svg 
                                :class="{ 'is-expanded': isCoverExpanded }" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M6 9L12 15L18 9" 
                                    stroke="currentColor" 
                                    stroke-width="2" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="preview-container" :class="{ 'is-expanded': isCoverExpanded }">
                        <ImageSelectionPreview 
                            :imageUrl="coverImage" 
                            @image-selected="handleCoverImageSelected" 
                            @image-removed="handleCoverImageRemoved"
                        >
                            Click to select a cover image
                        </ImageSelectionPreview>
                    </div>
                </div>
            </div>
        </form>
    </Expander>
</template>


<script setup lang="ts">
import type { ProjectSettingField } from '~/types/project';
import type { Image } from '~/types/database';
import { ProjectStatuses } from '~/types/project';

interface Props {
    mainFields: Record<string, ProjectSettingField>;
    mainIgnoreFields: string[];
    authorImage: string | null;
}

interface Emits {
    (e: 'update:mainFields', value: Record<string, ProjectSettingField>): void;
    (e: 'author-image-selected', file: File): void;
    (e: 'author-image-removed'): void;
    (e: 'cover-image-selected', image: Image): void;
    (e: 'cover-image-removed'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isCoverExpanded = ref(true);

const coverImage = computed(() => props.mainFields.cover_image.value as string | null);

const mainFieldCount = computed(() =>
    Object.keys(props.mainFields)
        .filter(key => !props.mainIgnoreFields.includes(key))
        .length
);

const completedMainFields = computed(() =>
    getCompletedFieldsCount(props.mainFields, props.mainIgnoreFields)
);

function getCompletedFieldsCount(
    fields: Record<string, ProjectSettingField>,
    ignore?: string[]
): number {
    return Object.entries(fields).filter(([key, field]) => {
        if (ignore && ignore.includes(key)) return false;
        return field.error === null && field.value !== false && field.value !== '';
    }).length;
}

const selectStatus = (status: string) => {
    const updatedFields = { ...props.mainFields };
    updatedFields.status.value = status;
    emit('update:mainFields', updatedFields);
};

const removeStatus = () => {
    const updatedFields = { ...props.mainFields };
    updatedFields.status.value = '';
    emit('update:mainFields', updatedFields);
};

const formatStatusName = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const handleAuthorImageSelected = (file: File) => {
    emit('author-image-selected', file);
};

const handleAuthorImageRemoved = () => {
    emit('author-image-removed');
};

const handleCoverImageSelected = (image: Image) => {
    emit('cover-image-selected', image);
};

const handleCoverImageRemoved = () => {
    emit('cover-image-removed');
};
</script>

<style lang="scss" scoped>
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

.input-text {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--admin);
    transition: border-color 0.3s ease;
    will-change: border-color;
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
        border: 1px dashed transparent;
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
                border-bottom: 1px dashed var(--admin);
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

.project-status-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 0.5rem;
}

.project-status-label {
    font-family: 'Nunito', sans-serif;
    border-radius: 4px;
    cursor: pointer;
    padding: 2px 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
    will-change: background-color, color;
    min-height: 32px;
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