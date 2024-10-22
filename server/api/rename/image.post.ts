import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/server/utils/postgres';
import { type Image } from '~/types/database';

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    try {
        const db = PostgresUtil.getInstance();
        
        const body = await readBody(event);
        const { new_label, image_id } = body;

        if (!new_label || !image_id) {
            event.node.res.statusCode = 400;
            return {
                status: 400,
                message: 'Missing required fields: name, image_id'
            }
        }

        const result = await db.query<Image>(
            'UPDATE public.images SET label = $1 WHERE image_id = $2 RETURNING label',
            [new_label, image_id]
        );

        if (result.length === 0) {
            event.node.res.statusCode = 404;
            return {
                status: 404,
                message: 'Folder not found'
            }
        }

        const updatedImage: Image = result[0] as Image;

        const newLabel: string = updatedImage.label;

        return {
            status: 200,
            message: 'Folder updated successfully',
            data: {
                label: newLabel,
            }
        };
    } 
    catch (error: any) {
        console.error('Error in rename image handler:', error);

        event.node.res.statusCode = 500;
        return {
            status: 500,
            message: 'Internal server error, contact site administrator'
        };
    }
});