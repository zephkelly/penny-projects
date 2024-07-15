import { User } from '~/models/user';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error registering user, registering is disabled at this time.',
    });
});