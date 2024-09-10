import { ValidationError } from './validation';

export interface ProjectStatus {
    id: number;
    name: 'completed' | 'in progress' | 'ongoing' | 'canceled' | 'pending' | 'archived' | '';
}

export const projectStatuses: ProjectStatus[] = [
    { id: 1, name: 'completed' },
    { id: 2, name: 'in progress' },
    { id: 3, name: 'ongoing' },
    { id: 4, name: 'canceled' },
    { id: 5, name: 'pending' },
    { id: 6, name: 'archived' },
];

export interface ProjectSettingField {
    value: string | boolean | ProjectStatus | null;
    error: ValidationError | null;
    maxLength?: number;
}
