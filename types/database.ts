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

export interface Image {
    image_id: string;
    url: string;
    label: string;
    delete_hash: string;
    width: number;
    height: number;
    file_size: number;
    colour_main: string;
    colour_contrast: string;
}

export interface Folder {
    folder_id: string;
    name: string;
    created_date: Date;
    updated_date: Date;
}