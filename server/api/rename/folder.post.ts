import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/utils/postgres';
import { type Folder } from '~/types/database';

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    try {
        const db = PostgresUtil.getInstance();
        
        const body = await readBody(event);
        const { name, folder_id } = body;

        if (!name || !folder_id) {
            event.node.res.statusCode = 400;
            return {
                status: 400,
                message: 'Missing required fields: name, folder_id'
            }
        }

        const result = await db.query<Folder>(
            'UPDATE public.folders SET name = $1, updated_date = CURRENT_TIMESTAMP WHERE folder_id = $2 RETURNING name, updated_date',
            [name, folder_id]
        );

        if (result.length === 0) {
            event.node.res.statusCode = 404;
            return {
                status: 404,
                message: 'Folder not found'
            }
        }

        const updatedFolder: Folder = result[0] as Folder;

        const new_name: string = updatedFolder.name;
        const new_updated_date: Date = updatedFolder.updated_date;

        return {
            status: 200,
            message: 'Folder updated successfully',
            data: {
                name: new_name,
                updated_date: new_updated_date
            }
        };
    } 
    catch (error: any) {
        console.error('Error in create folder handler:', error);

        if (error.message.includes('duplicate key value violates unique constraint')) {
            event.node.res.statusCode = 409;
            return {
                status: 409,
                message: 'Folder name already exists'
            };
        }

        event.node.res.statusCode = 500;
        return {
            status: 500,
            message: 'Internal server error, contact site administrator'
        };
    }
});