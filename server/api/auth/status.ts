//@ts-ignore
import jwt from 'jsonwebtoken'

import { connectSupabase } from '~/utils/supabase'
import { isUserAdmin } from '~/utils/auth';

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
}

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
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        const isAdmin = await isUserAdmin(decodedToken.userId);

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