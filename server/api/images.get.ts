import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from "~/server/utils/postgres";
import { type Image} from '~/types/database'

export default defineEventHandler(async (event) => {
    await protectAdmin(event);
  
    try {
        const allImages = await getAllImages();
        return allImages;
    }
    catch (error) {
        console.error('Error in fetch folders handler:', error);
        throw createError({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});

async function getAllImages(): Promise<Image[]> {
    const db = PostgresUtil.getInstance();
  
    const imagesResult: Image[] = await db.query<Image>('SELECT * FROM public.images ORDER BY label');
  
    return imagesResult;
}