import { User } from '~/models/user';
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const user = await User.findOne({ email });
 
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password. Please try again.',
      });
    }
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid email or password. Please try again.',
        });
    }
    try {
        const token = jwt.sign({ userId: user._id, isAdmin: user.admin }, process.env.JWT_SECRET, { expiresIn: '24h' });
   
        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 24 hours
        });
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'An authentication error has occured. Contact site mainatiner.',
        });
    }
    return {
        statusCode: 200,
        statusMessage: 'Logged in successfully.'
    };
});