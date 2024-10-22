import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from "~/server/utils/postgres";
import { type Image, type Folder, type FrontendFolder } from '~/types/database'

export default defineEventHandler(async (event) => {
    await protectAdmin(event);
  
    try {
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

async function getFoldersWithImages(): Promise<FrontendFolder[]> {
    const db = PostgresUtil.getInstance();
  
    const foldersResult: Folder[] = await db.query<Folder>('SELECT * FROM public.folders ORDER BY name');
    
    const populatedFolders: FrontendFolder[] = await Promise.all(
        foldersResult.map(async (folder): Promise<FrontendFolder> => {
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