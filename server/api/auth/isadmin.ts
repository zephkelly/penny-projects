import jwt from 'jsonwebtoken';

//@ts-ignore
export default defineEventHandler(async (event) => {
    //@ts-ignore
    const token = getCookie(event, 'auth_token');

    if (!token) {
        return { isAdmin: false };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { isAdmin: decoded.isAdmin };
    } catch (error) {
        return { isAdmin: false };
    }
});