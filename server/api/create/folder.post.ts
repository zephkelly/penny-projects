
import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/server/utils/postgres';
import { type Folder } from '~/types/database';

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    const db = PostgresUtil.getInstance();

    try {
        
        const body = await readBody(event);
        const { name } = body;

        if (!name) {
            event.node.res.statusCode = 400;
            return {
                status: 400,
                message: 'Missing required fields: name'
            }
        }

        const result = await db.query<Folder>(
            'INSERT INTO public.folders (name) VALUES ($1) RETURNING *',
            [name]
        );

        const newFolder: Folder = result[0] as Folder;

        return {
            status: 200,
            message: 'Folder created successfully',
            data: newFolder
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