import protectAdmin from '@/server/protectAdmin';
import { PostgresUtil } from '@/server/utils/postgres';
import { type Image, type Folder } from '@/types/database';

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    try {
        const db = PostgresUtil.getInstance();

        const body = await readBody(event);
        const { image_id, folder_id } = body;

        if (!image_id || !folder_id) {
            event.node.res.statusCode = 400;
            return {
                status: 400,
                message: 'Missing fields. Required fields: image_id, folder_id'
            }
        }

        // Check if the folder exists
        const folderResult = await db.query<Folder>(
            'SELECT folder_id FROM private.folders WHERE folder_id = $1',
            [folder_id]
        );

        if (folderResult.length === 0) {
            event.node.res.statusCode = 404;
            return {
                status: 404,
                message: 'Folder not found'
            }
        }

        // Update the image's parent folder
        const result = await db.query<Image>(
            'UPDATE private.images SET parent_folder_id = $1 WHERE image_id = $2 RETURNING *',
            [folder_id, image_id]
        );

        if (result.length === 0) {
            event.node.res.statusCode = 404;
            return {
                status: 404,
                message: 'Image not found'
            }
        }

        const updatedImage: Image = result[0];

        return {
            status: 200,
            message: 'Image parent folder updated successfully',
            data: {
                image: updatedImage,
            }
        };
    }
    catch (error: any) {
        console.error('Error in update image parent folder handler:', error);

        event.node.res.statusCode = 500;
        return {
            status: 500,
            message: 'Internal server error, contact site administrator'
        };
    }
});