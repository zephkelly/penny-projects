import { ValidationError } from './validation';

export interface ProjectStatus {
    id: number;
    name: 'completed' | 'finished' | 'in progress' | 'ongoing' | 'cancelled' | 'pending' | 'archived' | 'proposed' | 'active' | 'draft' | '';
}

export const ProjectStatuses: ProjectStatus[] = [
    { id: 1, name: 'completed' },
    { id: 2, name: 'finished' },
    { id: 3, name: 'in progress' },
    { id: 4, name: 'ongoing' },
    { id: 5, name: 'active' },
    { id: 6, name: 'pending' },
    { id: 7, name: 'proposed' },
    { id: 8, name: 'cancelled' },
    { id: 9, name: 'archived' },
    { id: 10, name: 'draft' },
];

export interface ProjectSettingField {
    value: string | boolean | ProjectStatus | null;
    error: ValidationError | null;
    maxLength?: number;
}