//@ts-ignore
import jwt from 'jsonwebtoken';
import { PostgresUtil } from "~/utils/postgres";

import { type JWTPayload } from '~/types/auth';
import { type user } from '~/types/database';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token) {
        return {
            data: {
                profileImage: null
            }
        }
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string ) as JWTPayload;
        const db = PostgresUtil.getInstance();
        
        const data = await db.query('SELECT * FROM public.user WHERE "user_id" = $1', [decodedToken.sub]);
        const user: user = data[0];

        return user;
    }
    catch (error) {
        console.error('Error in auth handler:', error);

        deleteCookie(event, 'auth_token');
        return {
            data: {
                profileImage: null
            }
        }
    }
});

