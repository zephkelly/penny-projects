// import { type User } from '~/models/user';
//@ts-expect-error
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PostgresUtil } from "~/server/utils/postgres";
import { type JWTPayload } from '~/types/auth';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const db = PostgresUtil.getInstance();

    try {
        const data = await db.query('SELECT * FROM private.users WHERE "email" = $1', [email]);
        const user = data[0];

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid email or password. Please try again.',
            });
        }
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid email or password. Please try again.',
            });
        }
    
        // Generate JWT token
        const jwtPayload: JWTPayload = {
            id: user.user_id,
            profile_image: user.profile_image,
        };

        console.log('JWT Payload:', jwtPayload);

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: '24h' });
    
        // Set cookie
        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 24 hours
        });
    
        return {
            data: {
                statusCode: 200,
                statusMessage: 'Logged in successfully!',
            }
        };
    }
    catch (error) {
      console.error('Login error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'An authentication error has occurred, contact site maintainer.',
      });
    }
});