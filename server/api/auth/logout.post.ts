//@ts-ignore
export default defineEventHandler(async (event) => {
    //@ts-ignore
    deleteCookie(event, 'auth_token', {
      httpOnly: true,
      sameSite: true,
      path: '/'
    });
  
    return { success: true, message: 'Logged out successfully' };
  });