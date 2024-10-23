<template>
    <div class="page-container" v-if="isLoading">
        Loading...
    </div>
    <div class="page-container" v-else-if="loadError">
        {{ loadError }}
    </div>
    <div class="page-container" v-else>
        <ProjectsEditorHero
            title="Edit Project"
            :hasCompletedAllFields="hasCompletedAllFields"
            :draftSubmitEnabled="draftSubmitEnabled"
            :uploadingDraftProject="uploadingDraftProject"
            :uploadingPublishedProject="uploadingPublishedProject"
            @draft-submit="handleProjectDraftSubmit"
            @publish-submit="handleProjectSubmit"
        />
        <section class="metadata component">
            <ProjectsMainSetting
                v-model:mainFields="mainFields"
                :mainIgnoreFields="mainIgnoreFields"
                :authorImage="(authorImage) ? authorImage : null"
                @author-image-selected="handleAuthorImageSelected"
                @author-image-removed="handleAuthorImageRemoved"
                @cover-image-selected="handleCoverImageSelected"
                @cover-image-removed="handleCoverImageRemoved"
            />
            <ProjectsSEOSettings
                :seoFields="seoFields"
            />
        </section>
        <ClientOnly>
            <tipTapEditor
                v-if="isEditorReady"
                v-model:content="pageContent"
                :pageRelatedSettings="pageRelatedSettings"
                style="justify-content: center;"
            />
        </ClientOnly>
        <ImageManager ref="imageManagerRef" />
    </div>
</template>

<script setup lang="ts">
import ProjectsMainSetting from '~/components/projects/editor/mainSettings.vue';
import ProjectsSEOSettings from '~/components/projects/editor/seoSettings.vue';
import { ValidationError } from '~/types/validation';
import { type ProjectSettingField, type ProjectStatus } from '~/types/project';
import type { User, Image, Project, ProjectWithImage } from '~/types/database';
import type { ApiResponse } from '~/types/api';
import { formatDateDDMMYYY } from '~/utils/date';
import ImageManager from '~/components/popups/manager/image.vue';
import { useImageManager } from '~/composables/useImageManager';
import { useToast } from '~/composables/useToast';
import { useAuth } from '~/composables/useAuth';

const route = useRoute();
const { getUserInfo } = useAuth();
const { showToast } = useToast();

definePageMeta({
    middleware: ['admin']
});

// Loading states
const isLoading = ref(true);
const loadError = ref<string | null>(null);
const isEditorReady = ref(false);

// Image Manager
const { imageManagerPopupOpen, selectImage } = await useImageManager();

// User Info
const userInfo: Ref<User | null | undefined> = ref(await getUserInfo());
const authorImage = ref(userInfo.value?.profile_image);

// Page Content
const pageContent = ref('');
const projectId = ref<number | null>(null);

// Main Settings
const mainFields = reactive({
    title: { value: '', error: null, maxLength: 100 },
    subtitle: { value: '', error: null, maxLength: 100 },
    created_date: { value: '', error: null } as ProjectSettingField,
    status: { value: 'draft', error: null } as ProjectSettingField,
    author_name: { value: '', error: null, maxLength: 50 },
    author_image: { value: null as string | null, error: null } as ProjectSettingField,
    cover_image: { value: '', error: null, id: null } as ProjectSettingField & { id: number | null },
});

const mainIgnoreFields = ['status'];

// Validation
const validateMainForm = (field: ProjectSettingField) => {
    if ('maxLength' in field === false) return;

    const result = validator.validateField(field.value as string, field.maxLength as number);

    if (field === mainFields.title || field === mainFields.author_name) {
        result.value = validator.sanitiseDoubleSpaces(result.value);
    }

    field.value = result.value;
    field.error = result.error || null;
};

// Watch for field changes and validate
Object.values(mainFields).forEach(field => {
    watch(() => field.value, () => validateMainForm(field));
});

const mainFieldCount = computed(() => Object.values(mainFields).length);

// Image handlers
const handleAuthorImageSelected = (file: File) => {
    mainFields.author_image.value = URL.createObjectURL(file);
    mainFields.author_image.error = null;
};

const handleAuthorImageRemoved = () => {
    mainFields.author_image.value = '';
    mainFields.author_image.error = ValidationError.REQUIRED;
};

const handleCoverImageSelected = (image: Image) => {
    mainFields.cover_image.value = image.url;
    mainFields.cover_image.id = image.image_id;
    mainFields.cover_image.error = null;
};

const handleCoverImageRemoved = () => {
    mainFields.cover_image.value = '';
    mainFields.cover_image.id = null;
    mainFields.cover_image.error = ValidationError.REQUIRED;
};

// Page related settings
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

// Watch for SEO field changes and validate
Object.values(seoFields).forEach(field => {
    watch(() => field.value, () => validateSEOForm(field));
});

const completedSEOFields = computed(() => {
    return getCompletedFieldsCount(seoFields);
});

const completedMainFields = computed(() => {
    return getCompletedFieldsCount(mainFields, mainIgnoreFields);
});

// Add this completion check computed property
const hasCompletedAllFields = computed(() => {
    return completedMainFields.value === mainFieldCount.value - 1 && 
           completedSEOFields.value === seoFieldCount.value;
});

// Draft and submission handling
const draftSubmitEnabled = ref(false);
const uploadingDraftProject = ref(false);
const uploadingPublishedProject = ref(false);

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
            throw new Error('Failed to save draft');
        }

        projectId.value = response.data.project_id;
        showToast('Draft saved successfully!');
    } catch (error) {
        console.error('Error saving draft:', error);
        window.alert('There was an error saving the draft. Please try again.');
    } finally {
        uploadingDraftProject.value = false;
    }
};

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
            throw new Error('Failed to publish project');
        }

        projectId.value = response.data.project_id;
        showToast('Project published successfully!');
    } catch (error) {
        console.error('Error publishing project:', error);
        window.alert('There was an error saving the project. Please try again.');
    } finally {
        uploadingPublishedProject.value = false;
    }
};

// Load project data
const loadProject = async () => {
    try {
        const response = await $fetch<ApiResponse<ProjectWithImage>>(`/api/project/slug/${route.params.slug}?unpublished=true`, {
            method: 'GET'
        });

        if (response.status === 200 && response.data) {
            const project = response.data;
            
            // Set main fields
            mainFields.title.value = project.title ?? '';
            mainFields.subtitle.value = project.subtitle ?? '';
            mainFields.created_date.value = formatDateDDMMYYY(project.created_date ?? '');
            mainFields.status.value = project.status ?? 'draft';
            mainFields.author_name.value = project.author_name ?? '';
            mainFields.author_image.value = project.author_image_url;
            mainFields.cover_image.value = project.cover_image_url;
            mainFields.cover_image.id = project.cover_image_id;

            pageContent.value = project.content ?? '';
            projectId.value = project.project_id;

            // Set SEO fields
            seoFields.slug.value = project.slug ?? '';
            seoFields.seo_title.value = project.seo_title ?? '';
            seoFields.meta_description.value = project.seo_meta_description ?? '';

            // Set editor as ready after data is loaded
            nextTick(() => {
                isEditorReady.value = true;
            });
        } else {
            throw new Error(response.message || 'Failed to load project');
        }
    } catch (error) {
        console.error('Error loading project:', error);
        loadError.value = 'Failed to load project. Please try again.';
    } finally {
        isLoading.value = false;
    }
};

function getCompletedFieldsCount(
    fields: Record<string, ProjectSettingField>, 
    ignore?: string[]
): number {
    return Object.entries(fields).filter(([key, field]) => {
        if (ignore && ignore.includes(key)) {
            return false;
        }
        return field.error === null && field.value !== false && field.value !== '';
    }).length;
}

onMounted(async () => {
    await Promise.all([
        loadProject(),
        getUserInfo().then(info => {
            userInfo.value = info;
            if (!mainFields.author_name.value) {
                mainFields.author_name.value = `${info?.first_name} ${info?.last_name}`;
            }
            if (!mainFields.author_image.value) {
                mainFields.author_image.value = info?.profile_image || null;
            }
        })
    ]);
});
</script>

<style lang="scss" scoped>
div.page-container {
    margin-top: 14rem;

    @media (max-width: 768px) {
        margin-top: 10rem;
    }
}

.metadata {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
</style>