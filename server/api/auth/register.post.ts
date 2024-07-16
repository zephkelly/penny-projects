// import { User } from '~/models/user';
//@ts-ignore
// import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    return { 
        statusCode: 500,
        body: { message: 'Registering disabled' }
    };
//   try {
//     // Read the request body
//     const { email, password, name } = await readBody(event);

//     // Validate input
//     if (!email || !password || !name) {
//       throw createError({
//         statusCode: 400,
//         statusMessage: 'Email, password, and username are required',
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw createError({
//         statusCode: 409,
//         statusMessage: 'User with this email already exists',
//       });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       name
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Return success response
//     return { 
//       statusCode: 201,
//       body: { message: 'User registered successfully' }
//     };

//   } catch (error) {
//     console.error('Registration error:', error);
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'An unexpected error occurred during registration',
//     });
//   }
});