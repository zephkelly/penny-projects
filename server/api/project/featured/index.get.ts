import { PostgresUtil } from '~/server/utils/postgres'
import type { Project } from '~/types/database'
import { AuthUtils } from '~/server/utils/auth'

interface ProjectWithImage extends Project {
    cover_image_url: string | null;
    cover_colour_main: string | null;
    cover_colour_contrast: string | null;
}

export default defineEventHandler(async (event) => {
    const db = PostgresUtil.getInstance()
    const query = getQuery(event)

    let limitClause = ''
    if (query.limit) {
        const limit = parseInt(query.limit as string)
        if (isNaN(limit) || limit <= 0) {
            return {
                status: 400,
                body: {
                    message: 'Invalid limit parameter. Must be a positive integer'
                }
            }
        }
        limitClause = `LIMIT ${limit}`
    }

    try {
        // Check admin status if unpublished flag is present
        const showUnpublished = query.unpublished === 'true'
        const isAdmin = showUnpublished ? await AuthUtils.isAdmin(event) : false

        if (showUnpublished && !isAdmin) {
            return {
                status: 403,
                body: {
                    message: 'Unauthorized to view unpublished projects'
                }
            }
        }

        // Get featured projects with visibility filter and optional limit
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
            WHERE p.featured = true
            ${AuthUtils.getVisibilityFilter(isAdmin)}
            ORDER BY p.updated_date DESC
            ${limitClause}
        `)

        return {
            status: 200,
            body: {
                data: result,
                total: result.length,
                limit: query.limit ? parseInt(query.limit as string) : null
            }
        }
    } catch (error) {
        console.error('Error fetching featured projects:', error)
        return {
            status: 500,
            body: {
                message: 'An error occurred while fetching featured projects'
            }
        }
    }
})