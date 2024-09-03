import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from "~/utils/postgres";
import { type Image, type Folder, type PopulatedFolder } from '~/types/database'

export default defineEventHandler(async (event) => {
    
  
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