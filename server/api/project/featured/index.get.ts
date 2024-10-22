import { PostgresUtil } from '~/server/utils/postgres'
import type { Project } from '~/types/database'
import type { ProjectStatus } from '~/types/project'

export default defineEventHandler(async (event) => {
    const db = PostgresUtil.getInstance()

    try {
        // Get featured projects
        const result = await db.query<Project>(`
            SELECT 
                project_id,
                title,
                subtitle,
                created_date,
                updated_date,
                status,
                published,
                author_name,
                author_image_url,
                cover_image_id,
                slug,
                seo_title,
                seo_meta_description,
                content,
                featured
            FROM private.projects 
            WHERE featured = true 
            ORDER BY updated_date DESC 
            LIMIT 3
        `)

        // Get cover images for the projects that have them
        const projectsWithImages = await Promise.all(
        result.map(async (project) => {
            if (project.cover_image_id) {
            const [coverImage] = await db.query(`
                SELECT url, colour_main, colour_contrast
                FROM private.images
                WHERE image_id = $1
            `, [project.cover_image_id])

            return {
                ...project,
                cover_image_url: coverImage?.url || null,
                cover_colour_main: coverImage?.colour_main || null,
                cover_colour_contrast: coverImage?.colour_contrast || null
            }
            }
            return project
        })
        )

        return {
        status: 200,
        body: { 
            data: projectsWithImages
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