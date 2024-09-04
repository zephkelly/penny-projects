import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/utils/postgres';
import { type Folder, type FrontendPayload } from '~/types/database';

export default defineEventHandler(async (event): Promise<FrontendPayload<Folder | null>> => {
    await protectAdmin(event);
    const db = PostgresUtil.getInstance();

    try {
        const body = await readBody(event);
        const { folder_id } = body;

        if (!folder_id) {
            event.node.res.statusCode = 400;
            return {
                status: 400,
                message: 'Missing required field: folder_id'
            };
        }

        await db.query(
            'UPDATE public.images SET parent_folder_id = NULL WHERE parent_folder_id = $1',
            [folder_id]
        );

        // Delete the folder
        const result = await db.query<Folder>(
            'DELETE FROM public.folders WHERE folder_id = $1 RETURNING *',
            [folder_id]
        );

        if (result.length === 0) {
            event.node.res.statusCode = 404;
            return {
                status: 404,
                message: 'Folder not found'
            };
        }

        const deletedFolder: Folder = result[0];
        return {
            status: 200,
            message: 'Folder deleted successfully and associated images updated'
        };
    }
    catch (error: any) {

        console.error('Error in delete folder handler:', error);
        event.node.res.statusCode = 500;
        return {
            status: 500,
            message: 'Internal server error, contact site administrator'
        };
    }
});