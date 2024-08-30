// //@ts-ignore
// import jwt from 'jsonwebtoken'

// import { type JWTPayload } from '~/types/auth'
// import { connectSupabase } from '~/utils/supabase'
// import { isUserAdmin } from '~/utils/auth';


// export default defineEventHandler(async (event) => {
//     const token = getCookie(event, 'auth_token')

//     if (!token) {
//         return { 
//             data: {
//                 isLoggedIn: false, 
//                 isAdmin: false 
//             }
//         }
//     }
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
//         const isAdmin = await isUserAdmin(decodedToken.userId);

//         return {
//             data: {
//                 isLoggedIn: true,
//                 isAdmin: isAdmin
//             }
//         }
//     } catch (error) {
//         deleteCookie(event, 'auth_token');
//         return { 
//             data: {
//                 isLoggedIn: false,
//                 isAdmin: false
//             }
//         }
//     }
// });