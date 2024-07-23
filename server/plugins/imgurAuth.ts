import fs from 'fs/promises';
import path from 'path';

interface ImgurToken {
    access_token: string;
    refresh_token: string;
    expires_at: number;
}


const TOKEN_FILE = path.join(process.cwd(), 'imgurToken.json');

async function getToken(): Promise<ImgurToken | null> {
    try {
        const data = await fs.readFile(TOKEN_FILE, 'utf-8');
        return JSON.parse(data);
    } 
    catch (error) {
        return null;
    }
}

async function saveToken(token: ImgurToken): Promise<void> {
    await fs.writeFile(TOKEN_FILE, JSON.stringify(token));
}

// async function refreshAccessToken(refreshToken: string): Promise<ImgurToken> {
//     const config = useRuntimeConfig()
//     const response = await axios.post('https://api.imgur.com/oauth2/token', {
//       refresh_token: refreshToken,
//       client_id: config.imgurClientId,
//       client_secret: config.imgurClientSecret,
//       grant_type: 'refresh_token'
//     })
  
//     const newToken: ImgurToken = {
//       access_token: response.data.access_token,
//       refresh_token: response.data.refresh_token,
//       expires_at: Date.now() + response.data.expires_in * 1000
//     }
  
//     await saveToken(newToken)
//     return newToken
//   }