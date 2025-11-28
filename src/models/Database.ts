import mariadb from 'mariadb';

export class Database {
  private static pool: mariadb.Pool | null = null;

  /**
   * Initialize the database connection pool
   */
  static async init(): Promise<mariadb.Pool> {
    try {
      if (!this.pool) {
        this.pool = mariadb.createPool({
          host: process.env.NOVA_API_DB_HOST,
          user: process.env.NOVA_API_DB_USER,
          password: process.env.NOVA_API_DB_PASSWORD,
          database: process.env.NOVA_API_DB_NAME,
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
