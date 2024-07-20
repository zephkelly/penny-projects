//@ts-ignore
export default defineEventHandler(async (event) => {
    //@ts-ignore
    try {
        deleteCookie(event, 'auth_token', {
          httpOnly: true,
          sameSite: true,
          path: '/'
        });
    }
    catch (error) {
        return {
            data: {
                statusCode: 500,
                statusMessage: 'An error has occured. Please try again.',
            }
        }
    }
  
    return { 
        data: {
            statusCode: 200, 
            statusMessage: 'Logged out successfully' 
        }
    };
  });