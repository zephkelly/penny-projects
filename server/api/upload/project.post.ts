import protectAdmin from '~/server/protectAdmin';
import { PostgresUtil } from '~/utils/postgres';
import { type Project } from '~/types/database';

export default defineEventHandler(async (event) => {
    await protectAdmin(event);

    const db = PostgresUtil.getInstance();

    try {
        const body = await readBody(event);
        const project: Project = body.project;

        if (project.project_id !== null && project.project_id !== undefined) {
            const result = await db.query<Project>(
                'UPDATE public.project SET title = $1, subtitle = $2, status = $3, published = $4, author_name = $5, author_image_url = $6, cover_image_url = $7, slug = $8, seo_title = $9, seo_meta_description = $10, content = $11 WHERE project_id = $12 RETURNING project_id',
                [project.title, project.subtitle, project.status, project.published, project.author_name, project.author_image_url, project.cover_image_url, project.slug, project.seo_title, project.seo_meta_description, project.content, project.project_id]
            );

            return {
                status: 200,
                message: 'Project updated successfully',
                data: {
                    project_id: result[0].project_id
                }
            };
        }

        const newProject = await db.query<Project>(
            'INSERT INTO public.project (title, subtitle, status, published, author_name, author_image_url, cover_image_url, slug, seo_title, seo_meta_description, content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING project_id',
            [project.title, project.subtitle, project.status, project.published, project.author_name, project.author_image_url, project.cover_image_url, project.slug, project.seo_title, project.seo_meta_description, project.content]
        );
        
        return {
            status: 200,
            message: 'Project created successfully',
            data: {
                project_id: newProject[0].project_id
            }
        };
    }
    catch (error: any) {
        console.error('Error in project upload handler:', error);

        event.node.res.statusCode = 500;
        return {
            status: 500,
            message: 'Internal server error, contact site administrator'
        };
    }
})