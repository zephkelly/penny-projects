import formidable from 'formidable'
import { defineEventHandler } from 'h3'
import type { ImgurUploadMinimalResponse } from '@/types/imgur'

type ColorExtractionResponse = {
    success: boolean;
    color?: string;
    textColor?: string;
    error?: string;
  }

export default defineEventHandler(async (event) => {
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

            return {
                success: true,
                link: response.data.link,
                deleteHash: response.data.deletehash,
                dominantColor: colorResponse.success ? colorResponse.color : null,
                legibleTextColor: colorResponse.success ? colorResponse.textColor : null
            }
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