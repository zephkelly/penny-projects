import formidable from 'formidable'
import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/utils/postgres';
import { type Image } from '~/types/database';
import type { ImgurUploadMinimalResponse } from '@/types/imgur'

type ColorExtractionResponse = {
    success: boolean;
    color?: string;
    textColor?: string;
    error?: string;
  }

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    const db = PostgresUtil.getInstance();

    try {
        const imgurClient = event.context.imgur;
        const form = formidable({
            multiples: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        const [fields, files] = await form.parse(event.node.req);

        if (!fields.image || typeof fields.image !== 'string') {
            throw new Error('No image data uploaded');
        }

        const base64Image = fields.image;
        const label = fields.label;
        const parent_folder_id = fields.parent_folder_id;
        const width = fields.width;
        const height = fields.height;
        const file_size = fields.file_size;

        const response = await $fetch<ImgurUploadMinimalResponse>('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                ...imgurClient.getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: base64Image,
                type: 'base64'
            })
        });

        if (response.success) {
            const colorResponse = await $fetch<ColorExtractionResponse>('/api/upload/extract-color', {
                method: 'POST',
                body: JSON.stringify({
                    imageUrl: response.data.link
                })
            });

            console.log('Parent folder ID:', parent_folder_id);

            const result = await db.query<Image>(
                'INSERT INTO public.images (url, label, parent_folder_id, delete_hash, colour_main, colour_contrast, width, height, file_size) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [response.data.link, label, parent_folder_id, response.data.deletehash, colorResponse.success ? colorResponse.color : null, colorResponse.success ? colorResponse.textColor : null, width, height, file_size]
            );

            const newImage: Image = result[0] as Image;

            return newImage;
        } 
        else {
            throw new Error('Imgur upload failed')
        }
    } 
    catch (error: any) {
        console.error('Error uploading to Imgur:', error)
        return {
            success: false,
            error: error.message
        }
    }
})