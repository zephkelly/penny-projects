// import { Pool, type PoolClient } from 'pg';
import pg from 'pg';

export class PostgresUtil {
  private static instance: PostgresUtil;
  private pool: pg.Pool;

  private constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    this.pool = new pg.Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
    });

    this.pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
      });
  }

  public static getInstance(): PostgresUtil {
    if (!PostgresUtil.instance) {
      PostgresUtil.instance = new PostgresUtil();
    }
    return PostgresUtil.instance;
  }

  public async getClient(): Promise<pg.PoolClient> {
    return await this.pool.connect();
  }

  public async query<T = any>(text: string, params: any[] = []): Promise<T[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(text, params);
      console.log(result.rows);
      return result.rows as T[];
    } finally {
      client.release();
    }
  }

  public async transaction<T = any>(callback: (client: pg.PoolClient) => Promise<T>): Promise<T> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  public async getDatabaseInfo(): Promise<void> {
    try {
      const dbNameResult = await this.query('SELECT current_database()');
      console.log('Current database:', dbNameResult[0].current_database);

      const schemasResult = await this.query('SELECT schema_name FROM information_schema.schemata');
      console.log('Schemas:', schemasResult.map(row => row.schema_name));

      const tablesResult = await this.query(`
        SELECT table_schema, table_name 
        FROM information_schema.tables 
        WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
      `);
      console.log('Tables:', tablesResult);
    } catch (error) {
      console.error('Error getting database info:', error);
    }
  }
}



// Usage example
export async function fetchUsers() {
    const db = PostgresUtil.getInstance();
    try {
      // First, let's get database information
    //   await db.getDatabaseInfo();
  
      // Now, let's try to query the users table
      return await db.query('SELECT * FROM public.user');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }