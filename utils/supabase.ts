// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// let supabaseClient: SupabaseClient | null = null;

// export const connectSupabase = async () => {
//     if (supabaseClient === null) {
//         supabaseClient = createClient(
//             process.env.SUPABASE_URL as string,
//             process.env.SUPABASE_KEY as string
//         );
//     }

//     return supabaseClient;
// };

// export default defineNitroPlugin((nitroApp) => {
//     connectSupabase();
// });