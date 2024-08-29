import { ValidationError, type ValidationResult } from "~/types/validation";

export const validator = {
    sanitiseWhitespace(value: string): string {
        return value.trim();
    },

    sanitiseAllSpaces(value: string): string {
        return value.replace(/\s/g, '');
    },

    sanitiseDoubleSpaces(value: string): string {
        return value.replace(/\s+/g, ' ');
    },

    sanitiseDoubleHyphen(value: string): string {
        return value.replace(/--+/g, '-');
    },

    removeSpecialCharacters(value: string, exclusionList: string[] = []): string {
        const specialCharacters = new RegExp(`[^A-Za-z0-9${exclusionList.join('')}]`, 'g');
        return value.replace(specialCharacters, '');
    },

    slugify(value: string): string {
        let noCharSlug = this.removeSpecialCharacters(value, ['-', ' ']);
        noCharSlug = noCharSlug.replace(/\s/g, '-');
        noCharSlug = this.sanitiseDoubleHyphen(noCharSlug);
        return noCharSlug.toLowerCase();
    },

    checkLength(value: string, maxLength: number): boolean {
        return value.length <= maxLength;
    },

    validateRequired(value: string): ValidationResult {
        if (value === '') {
            return { value: value, isValid: false, error: ValidationError.REQUIRED };
        }

        return { value: value, isValid: true };
    },

    validateLength(value: string, maxLength: number): ValidationResult {
        if (!this.checkLength(value, maxLength)) {
            return { value: value, isValid: false, error: ValidationError.TOO_LONG };
        }

        return { value: value, isValid: true };
    },

    validateField(value: string, maxLength: number): ValidationResult {
        const requiredResult = this.validateRequired(value);

        if (!requiredResult.isValid) {
            return requiredResult;
        }

        return this.validateLength(requiredResult.value, maxLength);
    }
};