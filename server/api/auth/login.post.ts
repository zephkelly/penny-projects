import { type User } from '~/models/user';
//@ts-expect-error
import bcrypt from 'bcrypt';
//@ts-expect-error
import jwt from 'jsonwebtoken';

import { connectSupabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const supabase = await connectSupabase();

  try {
    // Query the USER table in Supabase
    const { data: user, error } = await supabase
      .from('USER')
      .select('*')
      .eq('Email', email)
      .single();

    if (error || !user) {
      return {
        data: {
          statusCode: 401,
          statusMessage: 'Invalid email or password. Please try again.',
        }
      };
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return {
        data: {
          statusCode: 401,
          statusMessage: 'Invalid email or password. Please try again.',
        }
      };
    }

    // Generate JWT token
    const jwtPayload = {
        userId: user.UserId,
    };

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
  } catch (error) {
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An authentication error has occurred, contact site maintainer.',
    });
  }
});