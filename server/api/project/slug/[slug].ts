import { PostgresUtil } from '~/server/utils/postgres'
import type { Project } from '~/types/database'
import { AuthUtils } from '~/server/utils/auth'
import type { ApiResponse } from '~/types/api'

interface ProjectWithImage extends Project {
    cover_image_url: string | null;
    cover_colour_main: string | null;
    cover_colour_contrast: string | null;
}

interface QueryParams {
    unpublished?: string;
}

export default defineEventHandler(async (event): Promise<ApiResponse<ProjectWithImage>> => {
    const db = PostgresUtil.getInstance()
    const query = getQuery<QueryParams>(event)
    
    const slug = event.context.params?.slug
    
    if (!slug) {
        setResponseStatus(event, 400)
        return {
            status: 400,
            data: null,
            message: 'Slug parameter is required'
        }
    }

    try {
        const showUnpublished = query.unpublished === 'true'
        const isAdmin = showUnpublished ? await AuthUtils.isAdmin(event) : false

        if (showUnpublished && !isAdmin) {
            setResponseStatus(event, 403)

            return {
                status: 403,
                data: null,
                message: 'Unauthorized to view unpublished projects'
            }
        }

        // Build WHERE clause based on visibility permissions
        let whereConditions = [`p.slug = $1`]
        
        if (!isAdmin) {
            whereConditions.push('p.published = true')
        }

        const whereClause = `WHERE ${whereConditions.join(' AND ')}`

        // Query for project with matching slug
        const result = await db.query<ProjectWithImage>(`
            SELECT
                p.project_id,
                p.title,
                p.subtitle,
                p.created_date,
                p.updated_date,
                p.status,
                p.published,
                p.author_name,
                p.author_image_url,
                p.cover_image_id,
                p.slug,
                p.seo_title,
                p.seo_meta_description,
                p.content,
                p.featured,
                i.url as cover_image_url,
                i.colour_main as cover_colour_main,
                i.colour_contrast as cover_colour_contrast
            FROM private.projects p
            LEFT JOIN private.images i ON p.cover_image_id = i.image_id
            ${whereClause}
            LIMIT 1
        `, [slug])

        if (result.length === 0) {
            setResponseStatus(event, 404)
            return {
                status: 404,
                data: null,
                message: 'Project not found'
            }
        }

        return {
            status: 200,
            message: 'Project found',
            data: result[0]
        }
    }
    catch (error) {
        console.error('Error fetching project by slug:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch project by slug',
            cause: error
        })
    }
});