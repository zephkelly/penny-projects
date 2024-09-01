export interface User {
    user_id: string;
    user_type: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_image: string;
    created_date: Date;
    updated_date: Date;
    social_facebook: string;
    social_instagram: string;
}