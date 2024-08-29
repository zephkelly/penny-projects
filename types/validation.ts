export enum ValidationError {
    REQUIRED = 'Field is required',
    TOO_LONG = 'Field exceeds maximum length',
    INVALID_FORMAT = 'Invalid format'
  }
  
export type ValidationResult = {
    value: string;
    isValid: boolean;
    error?: ValidationError;
  };