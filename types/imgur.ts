export interface ImgurToken {
    access_token: string;
    refresh_token: string;
    expires_at: number;
}

export type ImgurTokenResponse = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    account_username: string;
    account_id: number;
};

export interface ImgurUploadResponse {
    data: {
        id: string;
        title: string | null;
        description: string | null;
        datetime: number;
        type: string;
        animated: boolean;
        width: number;
        height: number;
        size: number;
        views: number;
        bandwidth: number;
        vote: string | null;
        favorite: boolean;
        nsfw: boolean | null;
        section: string | null;
        account_url: string | null;
        account_id: number | null;
        is_ad: boolean;
        in_most_viral: boolean;
        has_sound: boolean;
        tags: string[];
        ad_type: number;
        ad_url: string;
        edited: string;
        in_gallery: boolean;
        deletehash: string;
        name: string;
        link: string;
    };
    success: boolean;
    status: number;
}

export interface ImgurUploadMinimalResponse {
    data: {
        link: string;
        deletehash?: string; // Include this if you still want the delete hash
    };
    success: boolean;
}