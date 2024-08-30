import { ValidationError } from './validation';

export interface ProjectSettingField {
    value: string | boolean | null;
    error: ValidationError | null;
    maxLength?: number;
}
