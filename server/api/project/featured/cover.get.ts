import { PostgresUtil } from '~/server/utils/postgres'
import type { ProjectStatus } from '~/types/project'
import type { Project, User } from '~/types/database'
// @ts-ignore
import jwt from 'jsonwebtoken'

interface ProjectCover {
    title: string | null;
    subtitle: string | null;
    created_date: string | null;
    status: ProjectStatus | null;
    slug: string | null;
    cover_image_url?: string | null;
}

interface JWTPayload {
    userId: string;
    // add other JWT fields as needed
}

export default defineEventHandler(async (event) => {
    const db = PostgresUtil.getInstance()
    const query = getQuery(event)
    
    // Handle limit parameter
    let limit: number | null = null;
    if (query.limit) {
        const parsedLimit = parseInt(query.limit as string);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
            limit = parsedLimit;
        } else {
            setResponseStatus(event, 400)
            return {
                error: 'Invalid limit parameter. Must be a positive integer'
            }
        }
    }

    // Check if we need to include unpublished projects
    const includeUnpublished = query.unpublished === 'true'
    
    // If including unpublished, verify authentication
    let isAuthorized = false;
    if (includeUnpublished) {
        try {
            // Get JWT token from cookie or Authorization header
            const token = getCookie(event, 'auth_token') || event.headers.get('Authorization')?.replace('Bearer ', '')
            
            if (!token) {
                setResponseStatus(event, 401)
                return { error: 'Unauthorized - No token provided' }
            }

            // Verify JWT and extract user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
            
            // Query database to check user's type
            const userResult = await db.query<User>(`
                SELECT user_type_id 
                FROM private.users 
                WHERE user_id = $1
            `, [decoded.userId])

            if (userResult.length === 0) {
                setResponseStatus(event, 401)
                return { error: 'Unauthorized - User not found' }
            }

            // Check if user has required permissions (type 1 or 2)
            isAuthorized = [1, 2].includes(userResult[0].user_type_id)
            
            if (!isAuthorized) {
                setResponseStatus(event, 403)
                return { error: 'Forbidden - Insufficient permissions' }
            }
        } catch (error) {
            console.error('Auth error:', error)
            setResponseStatus(event, 401)
            return { error: 'Unauthorized - Invalid token' }
        }
    }

    try {
        const featuredCovers = await db.query<ProjectCover>(`
            SELECT
                p.title,
                p.subtitle,
                p.created_date,
                p.status,
                p.slug,
                i.url as cover_image_url
            FROM private.projects p
            LEFT JOIN private.images i ON p.cover_image_id = i.image_id
            WHERE p.featured = true
            ${!includeUnpublished ? 'AND p.published = true' : ''}
            ORDER BY p.created_date DESC
            ${limit ? `LIMIT ${limit}` : ''}
        `)

        return {
            data: featuredCovers,
            total: featuredCovers.length,
            limit: limit || 'none'
        }
    }
    catch (error) {
        console.error('Error fetching featured project covers:', error)
        setResponseStatus(event, 500)
        return {
            error: 'An error occurred while fetching featured project covers'
        }
    }
})