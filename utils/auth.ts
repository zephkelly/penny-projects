//@ts-expect-error
import jwt from 'jsonwebtoken';
import { connectSupabase } from './supabase';

interface JWTPayload {
    userId: string;
    iat: number;
    exp: number;
}

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

export async function isUserAdmin(userId: string): Promise<boolean> {
    const supabase = await connectSupabase();
    const { data, error } = await supabase
        .from('USER')
        .select('UserType')
        .eq('UserId', userId)
        .single();
  
    if (error) {
        console.error('Error checking user admin status:', error);
        return false;
    }
  
    return data?.UserType === 1 || data?.UserType === 2;
}