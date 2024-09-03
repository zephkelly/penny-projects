//@ts-ignore
import jwt from 'jsonwebtoken'
import { PostgresUtil } from '~/utils/postgres';

import { type JWTPayload } from '~/types/auth'
import { type User } from '~/types/database'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token')

    if (!token) {
        return { 
            data: {
                isLoggedIn: false, 
                isAdmin: false 
            }
        }
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        const isAdmin = await isUserAdmin(decodedToken.sub);

        return {
            data: {
                isLoggedIn: true,
                isAdmin: isAdmin
            }
        }
    } catch (error) {
        deleteCookie(event, 'auth_token');
        return { 
            data: {
                isLoggedIn: false,
                isAdmin: false
            }
        }
    }
});

interface IAdminUserPayload {
    user_type: User['user_type'];
}

export async function isUserAdmin(userId: string): Promise<boolean> { 

    const db = PostgresUtil.getInstance();
    
    try {
        const data = await db.query('SELECT user_type FROM public.users WHERE "user_id" = $1', [userId]);
        const user: IAdminUserPayload = data[0];

        return user.user_type === 1 || user.user_type === 2;
    }
    catch (error) {
        console.error('Error checking if user is admin:', error);
        return false;
    }
}