export default defineNitroPlugin((nitroApp) => {
    try {
        const clientId = process.env.IMGUR_CLIENT_ID;

        if (!clientId) {
            throw new Error('Imgur Client ID is not set.');
        }

        const imgurClient = {
            clientId,
            getAuthHeader: () => ({ Authorization: `Client-ID ${clientId}` })
        };

        nitroApp.imgur = imgurClient;

        nitroApp.hooks.hook('request', async (event) => {
            event.context.imgur = imgurClient;
        });

        console.log('Imgur client setup successfully');
    } catch (error) {
        console.error('Failed to set up Imgur client:', error);
    }
});