import mariadb from 'mariadb';

export class Database {
  private static pool: mariadb.Pool | null = null;

  /**
   * Initialize the database connection pool
   */
  static async init(): Promise<mariadb.Pool> {
    try {
      if (!this.pool) {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log({ NOVA_API_DB_HOST: process.env.NOVA_API_DB_HOST });
        console.log({ NOVA_API_DB_USER: process.env.NOVA_API_DB_USER });
        console.log({ NOVA_API_DB_NAME: process.env.NOVA_API_DB_NAME });
        console.log({ NOVA_API_DB_PASSWORD: process.env.NOVA_API_DB_PASSWORD });

        this.pool = mariadb.createPool({
          host: process.env.NOVA_API_DB_HOST || 'localhost',
          user: process.env.NOVA_API_DB_USER || 'nova_api',
          password: process.env.NOVA_API_DB_PASSWORD || 'nova_api_pass',
          database: process.env.NOVA_API_DB_NAME || 'nova',
          connectionLimit: 10,
          acquireTimeout: 30000,
        });
      }
    } catch (err) {
      console.log('Database initialization error:', err);
      this.pool.end();
    }

    return this.pool;
  }

  /**
   * Get a connection from the pool
   */
  static async getConnection(): Promise<mariadb.PoolConnection> {
    if (!this.pool) {
      await this.init();
    }

    return this.pool!.getConnection();
  }

  /**
   * Execute a query directly
   */
  static async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    const conn = await this.getConnection();
    try {
      const results = await conn.query(sql, params);
      return results as T[];
    } finally {
      conn.release();
    }
  }

  /**
   * Close the connection pool
   */
  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
