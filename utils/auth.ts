//@ts-expect-error
import jwt from 'jsonwebtoken';

import { PostgresUtil } from "~/utils/postgres";

import { type User } from '~/types/database';
import { type JWTPayload } from '~/types/auth';

export function generateToken(userId: string): string {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET as string,
        { 
            expiresIn: '48h',
            issuer: 'penny-projects',
            audience: 'penny-projects'
        }
    );
}

export async function verifyToken(token: string): Promise<JWTPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
            token, 
            process.env.JWT_SECRET as string, 
            { 
                issuer: 'penny-projects',
                audience: 'penny-projects'
            },
            (err: any, decoded: any) => {
                if (err) reject(err);
                resolve(decoded as JWTPayload);
            }
        );
    });
}

interface IAdminUserPayload {
    user_type: User['user_type'];
}

export async function isUserAdmin(userId: string): Promise<boolean> { 

    const db = PostgresUtil.getInstance();
    
    try {
        const data = await db.query('SELECT user_type FROM public.user WHERE "user_id" = $1', [userId]);
        const user: IAdminUserPayload = data[0];

        return user.user_type === 1 || user.user_type === 2;
    }
    catch (error) {
        console.error('Error checking if user is admin:', error);
        return false;
    }
}