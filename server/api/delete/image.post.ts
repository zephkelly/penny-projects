import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/utils/postgres';
import { defineEventHandler } from 'h3'
import { type Image } from '~/types/database';

type ImgutDeletionResponse = {
    success: boolean;
}

export default defineEventHandler(async (event) => {
    await protectAdmin(event);
    const db = PostgresUtil.getInstance();

    try {
        const imgurClient = event.context.imgur;

        const body = await readBody(event)
        const image_id = body.image_id;
        const delete_hash = body.delete_hash;
        
        if (!image_id || !delete_hash) {
            throw new Error('Must provide both image_id and delete_hash');
        }


        await db.query(
            'DELETE FROM public.images WHERE image_id = $1',
            [image_id]
        );

        const response = await $fetch<ImgutDeletionResponse>('https://api.imgur.com/3/image/' + delete_hash, {
            method: 'DELETE',
            headers: imgurClient.getAuthHeader()
        });


        if (response.success) {
            return {
                status: 200,
                message: 'Image deleted successfully from database and Imgur'
            };

        }
        else{
            return {
                status: 500,
                message: 'Failed to delete image from Imgur'
            };
        }
    }
    catch (error: any) {
        return {
            status: 500,
            message: 'Internal server error, contact site administrator'
        };
    }
});