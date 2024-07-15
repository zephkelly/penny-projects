import { User } from '~/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user = await User.findOne({ email });
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }
  
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    sameSite: true,
    maxAge: 60 * 60 * 24 // 24 hours
  });

  return { message: 'Logged in successfully' };
});