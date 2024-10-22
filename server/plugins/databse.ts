import { PostgresUtil } from '~/server/utils/postgres'
import type { NitroApp } from 'nitropack'

declare module 'nitropack' {
    interface NitroApp {
        database: PostgresUtil
    }
}

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
    try {
        const pgUtil = PostgresUtil.getInstance()
        
        // Test connection
        await pgUtil.query('SELECT 1')
        console.log('Connected to the database')

        // Create tables using transaction
        await pgUtil.transaction(async (client) => {
            await client.query(`
                CREATE SCHEMA IF NOT EXISTS private;
                
                -- UserTypes table
                CREATE TABLE IF NOT EXISTS private.user_types (
                    user_type_id SERIAL PRIMARY KEY,
                    label VARCHAR(255) NOT NULL,
                    description TEXT
                );

                -- Users table
                CREATE TABLE IF NOT EXISTS private.users (
                    user_id SERIAL PRIMARY KEY,
                    user_type_id INTEGER NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    first_name VARCHAR(255) NOT NULL,
                    last_name VARCHAR(255) NOT NULL,
                    profile_image VARCHAR(255),
                    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    social_facebook VARCHAR(255),
                    social_instagram VARCHAR(255),
                    CONSTRAINT fk_user_type_id
                        FOREIGN KEY(user_type_id) 
                        REFERENCES private.user_types(user_type_id)
                        ON DELETE RESTRICT
                );

                -- Folders table
                CREATE TABLE IF NOT EXISTS private.folders (
                    folder_id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );

                -- Images table
                CREATE TABLE IF NOT EXISTS private.images (
                    image_id SERIAL PRIMARY KEY,
                    url VARCHAR(255) NOT NULL,
                    label VARCHAR(255),
                    delete_hash VARCHAR(255),
                    width INTEGER,
                    height INTEGER,
                    file_size INTEGER,
                    colour_main VARCHAR(7),
                    colour_contrast VARCHAR(7),
                    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    parent_folder_id INTEGER REFERENCES private.folders(folder_id) ON DELETE CASCADE,
                    CONSTRAINT fk_folder
                        FOREIGN KEY(parent_folder_id) 
                        REFERENCES private.folders(folder_id)
                        ON DELETE SET NULL
                );

                -- Projects table
                CREATE TABLE IF NOT EXISTS private.projects (
                    project_id SERIAL PRIMARY KEY,
                    title VARCHAR(255),
                    subtitle TEXT,
                    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    status VARCHAR(50),
                    published BOOLEAN DEFAULT false,
                    author_name VARCHAR(255),
                    author_image_url VARCHAR(255),
                    cover_image_id INTEGER,
                    slug VARCHAR(255) UNIQUE,
                    seo_title VARCHAR(255),
                    seo_meta_description TEXT,
                    content TEXT,
                    featured BOOLEAN DEFAULT false,
                    CONSTRAINT fk_cover_image
                        FOREIGN KEY(cover_image_id) 
                        REFERENCES private.images(image_id)
                        ON DELETE SET NULL
                );

                -- Create indexes
                CREATE INDEX IF NOT EXISTS idx_users_type ON private.users(user_type_id);
                CREATE INDEX IF NOT EXISTS idx_images_folder ON private.images(parent_folder_id);
                CREATE INDEX IF NOT EXISTS idx_projects_cover ON private.projects(cover_image_id);
                CREATE INDEX IF NOT EXISTS idx_projects_slug ON private.projects(slug);
            `)

            return true
        })

        console.log('Database tables initialised successfully')
        
        // Make the PostgresUtil instance available throughout the app
        nitroApp.database = pgUtil
    }
    catch (error) {
        console.error('Error initializing database:', error)
        throw error
    }
})