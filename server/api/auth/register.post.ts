import { type User } from '~/models/user';
//@ts-ignore
import bcrypt from 'bcrypt';
import { connectSupabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    return { 
        statusCode: 500,
        body: { message: 'Registering disabled' }
    };
//   try {
//     const { email, password, firstName, lastName, userType } = await readBody(event);

//     console.log(email, password, firstName, lastName, userType);

//     // Validate input
//     if (!email || !password || !firstName || !lastName ) {
//       throw createError({
//         statusCode: 400,
//         statusMessage: 'Email, password, and names are required',
//       });
//     }

//     const supabase = await connectSupabase();

//     // Check if user already exists
//     const { data: existingUser, error: checkError } = await supabase
//       .from('USER')
//       .select('UserId')
//       .eq('Email', email)
//       .single();

//     if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
//       console.error('Error checking existing user:', checkError);
//       throw createError({
//         statusCode: 500,
//         statusMessage: 'An unexpected error occurred during registration',
//       });
//     }

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
//     const { data: newUser, error: insertError } = await supabase
//         .from('USER')
//         .insert([{ 
//             Email: email,
//             Password: hashedPassword,
//             FirstName: firstName,
//             LastName: lastName,
//             UserType: userType
//         }
//     ])
//     .select()
//     .single();

//     if (insertError) {
//       console.error('Error inserting new user:', insertError);
//       throw createError({
//         statusCode: 500,
//         statusMessage: 'An unexpected error occurred during registration',
//       });
//     }

//     // Return success response
//     return {
//       statusCode: 201,
//       body: { message: 'User registered successfully', userId: newUser.id }
//     };

//   } catch (error: any) {
//     if (error.statusCode) {
//       // If it's an error we threw, pass it along
//       throw error;
//     }
//     console.error('Registration error:', error);
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'An unexpected error occurred during registration',
//     });
//   }
});