import { type ProjectStatus } from "./project";

export interface User {
    user_id: string;
    user_type: number; // Foreign key to UserType -> user_type_id
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

export interface UserType {
    user_type_id: number;
    label: string;
    description: string;
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
    project_id: number | null;
    title: string | null;
    subtitle: string | null;
    created_date: string | null;
    updated_date: string | null;
    status: ProjectStatus | null;
    published: boolean | null;
    author_name: string | null;
    author_image_url: string | null;
    cover_image_id: number | null;
    slug: string | null;
    seo_title: string | null;
    seo_meta_description: string | null;
    content: string | null;
}

export interface FrontendProject extends Project {
    is_new?: boolean;
    is_renaming?: boolean;
    is_deleting?: boolean;
    cover_image_url: string;
    cover_colour_main: string;
    cover_colour_contrast: string;
}