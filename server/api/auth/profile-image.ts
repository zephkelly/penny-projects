//@ts-ignore
import jwt from 'jsonwebtoken'
import { type JWTPayload} from '~/types/auth'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token')

    if (!token) {
        return {
            data: {
                profileImage: null
            }
        }
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

        return {
            data: {
                profileImage: decodedToken.profileImageUrl
            }
        }
    } catch (error) {
        console.error('Error in auth handler:', error)
        
        deleteCookie(event, 'auth_token');
        return {
            data: {
                profileImage: null
            }
        }
    }
});