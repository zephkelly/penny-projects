//@ts-ignore
import jwt from 'jsonwebtoken'

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
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        return {
            data: {
                isLoggedIn: true,
                isAdmin: decodedToken.isAdmin
            }
        }
    } catch (error) {
        return { 
            data: {
                isLoggedIn: false,
                isAdmin: false
            }
        }
    }
});