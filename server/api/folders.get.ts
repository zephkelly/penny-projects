//@ts-ignore
import jwt from 'jsonwebtoken';
import { PostgresUtil } from "~/utils/postgres";
import { isUserAdmin } from '~/utils/auth';

import { type JWTPayload } from "~/types/auth";
import { type Image, type Folder, type PopulatedFolder } from '~/types/database'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }
  
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        
        if (await !isUserAdmin(decodedToken.sub)) {
            throw createError({
            statusCode: 403,
            message: 'Forbidden'
            });
        }
        
        const populatedFolders = await getFoldersWithImages();
        return populatedFolders;
    }
    catch (error) {
        console.error('Error in fetch folders handler:', error);
        throw createError({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});

async function getFoldersWithImages(): Promise<PopulatedFolder[]> {
    const db = PostgresUtil.getInstance();
  
    // Fetch all folders
    const foldersResult = await db.query<Folder>('SELECT * FROM public.folders ORDER BY name');
    
    // Populate each folder with its images
    const populatedFolders: PopulatedFolder[] = await Promise.all(
      foldersResult.map(async (folder): Promise<PopulatedFolder> => {
        const imagesResult = await db.query<Image>(
          'SELECT * FROM public.images WHERE parent_folder_id = $1 ORDER BY label',
          [folder.folder_id]
        );
  
        return {
          ...folder,
          images: imagesResult
        };
      })
    );
  
    return populatedFolders;
}