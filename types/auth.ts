export interface JWTPayload {
    id: string;
    profile_image: string;
    iat?: number;
    exp?: number;
}