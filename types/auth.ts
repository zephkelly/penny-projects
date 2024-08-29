export interface JWTPayload {
    userId: string;
    profileImageUrl: string;
    iat?: number;
    exp?: number;
}