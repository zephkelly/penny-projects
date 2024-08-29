import { ValidationError } from './validation';

export interface ProjectSettingField {
    value: string | boolean;
    error: ValidationError | null;
    maxLength?: number;
}
