<template>
    <section class="project-hero component" style="justify-content: center;">
        <div class="container">
            <h1 class="header">{{ title }}</h1>
            <div class="project-buttons">
                <button 
                    class="submit draft"
                    :class="{ enabled: true }"
                    @click.prevent="$emit('draft-submit')"
                    :disabled="draftSubmitEnabled"
                >
                    <svg v-if="uploadingDraftProject" class="spinner" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/>
                    </svg>
                    <p v-else>Save Draft</p>
                </button>
                <button
                    class="submit publish"
                    :class="{ enabled: hasCompletedAllFields }"
                    @click.prevent="$emit('publish-submit')"
                    :disabled="!hasCompletedAllFields"
                    title="All settings must be completed to publish."
                >
                    <svg v-if="uploadingPublishedProject" class="spinner" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/>
                    </svg>
                    <p v-else>Publish</p>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    hasCompletedAllFields: boolean;
    draftSubmitEnabled: boolean;
    uploadingDraftProject: boolean;
    uploadingPublishedProject: boolean;
}>();

defineEmits<{
    (e: 'draft-submit'): void;
    (e: 'publish-submit'): void;
}>();
</script>

<style lang="scss" scoped>
.header {
    color: var(--admin);
}

section {
    margin-bottom: 2rem;

    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 2rem 0;

        @media (max-width: 768px) {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .project-buttons {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 1rem;

            @media (max-width: 768px) {
                flex-direction: column;
                gap: 1rem;
                width: 100%;

                .submit {
                    height: 44px;
                    width: 100%;
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
                height: 50px;

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
}
</style>