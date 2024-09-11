import { type ProjectStatus } from "./project";

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
    image_id: number;
    url: string;
    label: string;
    delete_hash: string;
    width: number;
    height: number;
    file_size: number;
    colour_main: string;
    colour_contrast: string;
    upload_date: string;
    parent_folder_id: number; // Foreign key to Folder -> folder_id
}

export interface Folder {
    folder_id: number;
    name: string;
    created_date: Date;
    updated_date: Date;
}

export interface FrontendFolder extends Folder {
    is_new?: boolean;
    is_renaming?: boolean;
    is_deleting?: boolean;
    images: Image[];
}

export type FrontendPayload<T> = {
    status: number;
    message: string;
    data?: T;
};

export interface Project {
    project_id: number;
    title: string;
    subtitle: string;
    created_date: string;
    updated_date: string;
    status: ProjectStatus;
    published: boolean;
    author_name: string;
    author_image_url: string;
    cover_image_url: string;
    slug: string;
    seo_title: string;
    seo_meta_description: string;
    content: string;
}