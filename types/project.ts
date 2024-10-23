import { ValidationError } from './validation';

export interface ProjectStatus {
    id: number;
    name: 'completed' | 'finished' | 'in progress' | 'ongoing' | 'cancelled' | 'needs funding' | 'archived' | 'pending' | 'proposed' | 'active' | 'draft' | '';
}

export const ProjectStatuses: ProjectStatus[] = [
    { id: 1, name: 'completed' },
    { id: 2, name: 'finished' },
    { id: 3, name: 'in progress' },
    { id: 4, name: 'ongoing' },
    { id: 5, name: 'active' },
    { id: 6, name: 'pending' },
    { id: 7, name: 'proposed' },
    { id: 8, name: 'needs funding' },
    { id: 9, name: 'cancelled' },
    { id: 10, name: 'archived' },
    { id: 11, name: 'draft' },
];

export interface ProjectSettingField {
    value: string | boolean | ProjectStatus | null;
    id?: number | null;
    error: ValidationError | null;
    maxLength?: number;
}

export interface ProjectFields {
    title: ProjectSettingField;
    subtitle: ProjectSettingField;
    created_date: ProjectSettingField;
    status: ProjectSettingField;
    author_name: ProjectSettingField;
    author_image: ProjectSettingField;
    cover_image: ProjectSettingField & { id: number | null };
}

export interface SEOFields {
    slug: ProjectSettingField;
    seo_title: ProjectSettingField;
    meta_description: ProjectSettingField;
}

export interface PageRelatedSettings {
    title: string;
    subtitle: string;
    created_date: string;
    author_name: string;
    author_image: string | null;
    social_facebook?: string;
    social_instagram?: string;
    status: string;
}