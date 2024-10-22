import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from "~/server/utils/postgres";
import { type FrontendProject } from '~/types/database'

const db = PostgresUtil.getInstance()

export default defineEventHandler(async (event) => {
    await protectAdmin(event);
  
    const query = getQuery(event);
    const page = query.page ? parseInt(query.page as string) : 1;
    const page_size = Number(query.page_size) || 10

    try {
        const offset = (page - 1) * page_size;

        const projects = await db.query<FrontendProject>(
            `SELECT p.*, 
                    i.url as cover_image_url, 
                    i.colour_main as cover_colour_main, 
                    i.colour_contrast as cover_colour_contrast
             FROM private.project p
             LEFT JOIN public.images i ON p.cover_image_id = i.image_id
             ORDER BY p.updated_date DESC
             LIMIT $1 OFFSET $2`,
            [page_size, offset]
        );

        const totalCountQuery = await db.query<{ count: string }>(
            'SELECT COUNT(*) FROM private.project'
        );

        const totalCount = parseInt(totalCountQuery[0].count)
        const totalPages = Math.ceil(totalCount / page_size)
        
        return {
            projects: projects,
            pagination: {
                currentPage: page,
                pageSize: page_size,
                totalCount: totalCount,
                totalPages: totalPages
            }
        }
    }
    catch (error) {
        console.error('Error fetching projects:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})