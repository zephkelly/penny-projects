import formidable from 'formidable'
import protectAdmin from '~/server/protectAdmin'
import { PostgresUtil } from '~/server/utils/postgres'
import { type Image } from '~/types/database'
import type { ImgurUploadMinimalResponse } from '@/types/imgur'
type ColorExtractionResponse = {
    color: string;
    textColor: string;
}
interface ImageFormFields {
    image: string;
    label: string;
    parent_folder_id: number;
    width: number;
    height: number;
    file_size: number;
}
export default defineEventHandler(async (event) => {
    try {
        await protectAdmin(event)
        const db = PostgresUtil.getInstance()
        const imgurClient = event.context.imgur
        const form = formidable({
            multiples: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
        })
       
        const [fields, files] = await form.parse(event.node.req)
        const imageData: ImageFormFields = {
            image: fields.image as unknown as string,
            label: fields.label as unknown as string,
            parent_folder_id: fields.parent_folder_id as unknown as number,
            width: fields.width as unknown as number,
            height: fields.height as unknown as number,
            file_size: fields.file_size as unknown as number
        }
        // Upload to Imgur
        const imgurResponse = await $fetch<ImgurUploadMinimalResponse>('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                ...imgurClient.getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageData.image,
                type: 'base64'
            })
        }).catch((error) => {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to upload image to Imgur',
                cause: error
            })
        })
        if (!imgurResponse.data?.link) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Invalid response from Imgur'
            })
        }
        // Extract colors
        const colorResponse = await $fetch<ColorExtractionResponse>('/api/upload/extract-color', {
            method: 'POST',
            body: JSON.stringify({
                imageUrl: imgurResponse.data.link
            })
        }).catch((error) => {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to extract colors from image',
                cause: error
            })
        })
        // Insert into database
        const insertQuery = 
            `INSERT INTO private.images (
                url,
                label,
                parent_folder_id,
                delete_hash,
                colour_main,
                colour_contrast,
                width,
                height,
                file_size
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `
        const queryParams = [
            imgurResponse.data.link,
            imageData.label,
            imageData.parent_folder_id,
            imgurResponse.data.deletehash,
            colorResponse.color,
            colorResponse.textColor,
            imageData.width,
            imageData.height,
            imageData.file_size
        ]
        const [newImage] = await db.query<Image>(insertQuery, queryParams)
        setResponseStatus(event, 201)
        return newImage
    } catch (error: any) {
        console.error('Image upload error:', error)
        if (error.statusCode) {
            throw error
        }
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process image upload',
            cause: error
        })
    }
})