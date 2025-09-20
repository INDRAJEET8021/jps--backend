import { getConnection } from 'database/dbConnection';
import { Router, Request, Response } from 'express';

class IndexRoute {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, async (req: Request, res: Response) => {
      try {
        const connection = getConnection();

        // Simple query to test DB connection
        const [rows] = await connection.query('SELECT 1 + 1 AS result');
        res.json({
          message: '🚀 API is running!',
          dbTest: rows,
        });
      } catch (error) {
        res.status(500).json({ error: 'Database query failed', details: error });
      }
    });
  }
}

export default IndexRoute;
