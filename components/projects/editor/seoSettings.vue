<template>
    <Expander
        title="SEO Settings"
        :totalOptions="seoFieldCount" 
        :completedOptions="completedSEOFields"
    >
        <form class="container">    
            <div class="wrapper url">
                <div class="field">
                    <label for="url">URL Slug</label>
                    <input 
                        class="input-text" 
                        v-model="seoFields.slug.value" 
                        id="url" 
                        type="text" 
                        placeholder="example-project-slug" 
                        required 
                    />
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
</template>

<script setup lang="ts">
import type { ProjectSettingField } from '~/types/project';

const props = defineProps<{
    seoFields: Record<string, ProjectSettingField>;
}>();

const seoFieldCount = computed(() => Object.values(props.seoFields).length);

const completedSEOFields = computed(() => 
    getCompletedFieldsCount(props.seoFields)
);

function getCompletedFieldsCount(
    fields: Record<string, ProjectSettingField>
): number {
    return Object.entries(fields)
        .filter(([_, field]) => 
            field.error === null && field.value !== false && field.value !== ''
        ).length;
}
</script>
