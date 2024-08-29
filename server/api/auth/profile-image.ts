//@ts-ignore
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'
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
        
        // Initialize Supabase client
        const supabase = createClient(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_KEY as string
        )

        // Fetch user data from Supabase
        const { data: userData, error } = await supabase
            .from('USER')
            .select('ProfileImage')
            .eq('UserId', decodedToken.userId)
            .single()

        if (error) {
            console.error('Error fetching user data:', error)
            throw error
        }

        return {
            data: {
                profileImage: userData.ProfileImage
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