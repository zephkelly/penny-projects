//@ts-ignore
export default defineEventHandler(async (event) => {
    //@ts-ignore
    deleteCookie(event, 'auth_token', {
      httpOnly: true,
      sameSite: true,
      path: '/'
    });
  
    return { message: 'Logged out successfully' };
  });