export default async (event: any) => {
    const response = await $fetch('/api/auth/status', { headers: event.headers, credentials: 'include' });

    if (response === undefined) {
        throw createError({
            statusCode: 500,
            message: 'Error checking auth status'
        })
    };

    const status = response.data;

    if (status === null) {
        throw createError({
            statusCode: 500,
            message: 'Error checking auth status'
        })
    }

    if (!status.isLoggedIn) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    event.isLoggedIn = status.isLoggedIn;
    event.isAdmin = status.isAdmin;
}