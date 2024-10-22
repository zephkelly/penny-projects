import jwt from 'jsonwebtoken'
import { PostgresUtil } from '~/server/utils/postgres'
import type { H3Event } from 'h3'
import type { JWTPayload } from '~/types/auth'

export class AuthUtils {
    private static db = PostgresUtil.getInstance()

    /**
     * Checks if the current user has admin privileges
     * @param event H3Event from Nitro
     * @returns boolean indicating if user has admin access
     * @throws Error if authentication fails
     */
    static async isAdmin(event: H3Event): Promise<boolean> {
        try {
            const token = getCookie(event, 'auth_token') || event.headers.get('Authorization')?.replace('Bearer ', '')

            if (!token) {
                return false
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
            
            const [user] = await this.db.query(`
                SELECT user_type_id 
                FROM private.users 
                WHERE user_id = $1
            `, [decoded.id])

            return user && [1, 2].includes(user.user_type_id)
        } catch (error) {
            console.error('Auth check error:', error)
            return false
        }
    }

    /**
     * Returns a WHERE clause for queries based on user's admin status
     * @param isAdmin boolean indicating if user has admin access
     * @returns SQL WHERE clause fragment
     */
    static getVisibilityFilter(isAdmin: boolean): string {
        return isAdmin ? '' : 'AND published = true'
    }
}