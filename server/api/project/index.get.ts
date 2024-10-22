import { PostgresUtil } from '~/server/utils/postgres'
import type { Project } from '~/types/database'
import { AuthUtils } from '~/server/utils/auth'

interface ProjectWithImage extends Project {
    cover_image_url: string | null;
    cover_colour_main: string | null;
    cover_colour_contrast: string | null;
}

interface PaginationParams {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface QueryParams {
    page?: string;
    limit?: string;
    unpublished?: string;
    published?: string;
}

const MAX_ITEMS_PER_PAGE = 20

export default defineEventHandler(async (event) => {
    const db = PostgresUtil.getInstance()
    const query = getQuery<QueryParams>(event)

    // Pagination params validation
    const page = Math.max(1, parseInt(query.page || '1'))
    const itemsPerPage = Math.max(1, Math.min(MAX_ITEMS_PER_PAGE, parseInt(query.limit || '10'))) // Cap at 20 items per page
    const offset = (page - 1) * itemsPerPage

    try {
        // Handle authentication and visibility
        const showUnpublished = query.unpublished === 'true'
        const showPublished = query.published !== 'false'
        const isAdmin = showUnpublished ? await AuthUtils.isAdmin(event) : false

        if (showUnpublished && !isAdmin) {
            return {
                status: 403,
                body: {
                    message: 'Unauthorized to view unpublished projects'
                }
            }
        }

        // Build WHERE clause based on filters
        let whereConditions = []
        
        if (!isAdmin || (!showUnpublished && showPublished)) {
            // Non-admin users or when only published requested
            whereConditions.push('p.published = true')
        } else if (showUnpublished && !showPublished) {
            // Admin requesting only unpublished
            whereConditions.push('p.published = false')
        }

        const whereClause = whereConditions.length 
            ? `WHERE ${whereConditions.join(' AND ')}` 
            : ''

        // Get total count for pagination
        const [countResult] = await db.query<{ total: number }>(`
            SELECT COUNT(*) as total
            FROM private.projects p
            ${whereClause}
        `)

        const total = parseInt(countResult.total.toString())
        const totalPages = Math.ceil(total / itemsPerPage)

        // Main query with pagination
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
            ORDER BY p.created_date DESC
            LIMIT ${itemsPerPage}
            OFFSET ${offset}
        `)

        const pagination: PaginationParams = {
            page,
            limit: itemsPerPage,
            total,
            totalPages
        }

        return {
            status: 200,
            body: {
                data: result,
                pagination,
                filters: {
                    showUnpublished,
                    showPublished
                }
            }
        }
    }
    catch (error) {
        console.error('Error fetching projects:', error)
        return {
            status: 500,
            body: {
                message: 'An error occurred while fetching projects'
            }
        }
    }
});