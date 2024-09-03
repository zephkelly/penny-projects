
import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/utils/postgres';

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    try {
        const db = PostgresUtil.getInstance();
        
        const body = await readBody(event);
        const { name } = body;

        if (!name) {
            throw createError({
                statusCode: 400,
                message: 'Folder name is required'
            });
        }

        const result = await db.query(
            'INSERT INTO public.folders (name) VALUES ($1) RETURNING *',
            [name]
        );

        const newFolder = result[0];

        return newFolder;
    } 
    catch (error) {
        console.error('Error in create folder handler:', error);
        throw createError({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});