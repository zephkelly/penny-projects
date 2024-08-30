export interface JWTPayload {
    sub: string;
    profile_image: string;
    iat?: number;
    exp?: number;
}