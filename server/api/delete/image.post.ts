import { read } from 'fs';
import { defineEventHandler } from 'h3'

type ImgutDeletionResponse = {
    success: boolean;
}

export default defineEventHandler(async (event) => {
    try {
        const imgurClient = event.context.imgur;

        const body = await readBody(event)
        const deleteHash = body.deleteHash
        
        if (!deleteHash || typeof deleteHash !== 'string') {
            throw new Error('No delete hash provided');
        }

        const response = await $fetch<ImgutDeletionResponse>('https://api.imgur.com/3/image/' + deleteHash, {
            method: 'DELETE',
            headers: imgurClient.getAuthHeader()
        });


        if (response.success) {
            return {
                success: true
            };

        }
        else{
            throw new Error('Imgur deletion failed');
        }
    }
    catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
});
