//@ts-ignore
import jwt from 'jsonwebtoken';
import { PostgresUtil } from "~/utils/postgres";

import { isUserAdmin } from '~/utils/auth';
import { type JWTPayload } from '~/types/auth';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        
        if (await !isUserAdmin(decodedToken.sub)) {
            throw createError({
                statusCode: 403,
                message: 'Forbidden'
            });
        }
        
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
    } catch (error) {
        console.error('Error in create folder handler:', error);
        throw createError({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});