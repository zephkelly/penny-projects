import type { ProjectFields, SEOFields, PageRelatedSettings } from '~/types/project';
import type { User } from '@/types/database';

export function useProjectEditor() {
    const defaultValues = {
        title: 'Your New Project Title',
        subtitle: 'Write a longer, attention-grabbing subtitle here',
        created_date: formatDateDDMMYYY(new Date().toISOString()),
        status: 'draft',
        author_name: '',
        author_image: null,
        cover_image: '',
    };

    const mainFields = reactive<ProjectFields>({
        title: { value: defaultValues.title, error: null, maxLength: 100 },
        subtitle: { value: defaultValues.subtitle, error: null, maxLength: 100 },
        created_date: { value: defaultValues.created_date, error: null },
        status: { value: defaultValues.status, error: null },
        author_name: { value: defaultValues.author_name, error: null, maxLength: 50 },
        author_image: { value: defaultValues.author_image, error: null },
        cover_image: { value: defaultValues.cover_image, error: null, id: null }
    });

    const seoFields = reactive<SEOFields>({
        slug: { value: '', error: null, maxLength: 100 },
        seo_title: { value: '', error: null, maxLength: 60 },
        meta_description: { value: '', error: null, maxLength: 160 }
    });

    const pageContent = ref('');
    const projectId = ref<number | null>(null);
    const userInfo = ref<User | null>(null);

    const mainIgnoreFields = ['status'];
    const draftSubmitEnabled = ref(false);
    const uploadingDraftProject = ref(false);
    const uploadingPublishedProject = ref(false);

    const pageRelatedSettings = computed<PageRelatedSettings>(() => ({
        title: mainFields.title.value as string || 'Your New Project Title',
        subtitle: mainFields.subtitle.value as string || 'Write a longer, attention-grabbing subtitle here',
        created_date: mainFields.created_date.value as string,
        author_name: mainFields.author_name.value as string,
        author_image: mainFields.author_image.value as string | null,
        status: mainFields.status.value as string
    }));

    const hasCompletedAllFields = computed(() => {
        const mainCompleted = Object.entries(mainFields)
            .filter(([key]) => !mainIgnoreFields.includes(key))
            .every(([_, field]) => field.error === null && field.value !== '' && field.value !== false);

        const seoCompleted = Object.values(seoFields)
            .every(field => field.error === null && field.value !== '' && field.value !== false);

        return mainCompleted && seoCompleted;
    });

    return {
        mainFields,
        seoFields,
        pageContent,
        projectId,
        userInfo,
        mainIgnoreFields,
        draftSubmitEnabled,
        uploadingDraftProject,
        uploadingPublishedProject,
        pageRelatedSettings,
        hasCompletedAllFields
    };
}