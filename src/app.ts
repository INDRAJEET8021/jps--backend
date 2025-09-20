import express, { Application } from 'express';
import { PORT, NODE_ENV } from '@config/config';
import { connectToDatabase } from 'database/dbConnection';
import errorMiddleware from '@middlewares/error.middleware';


interface Routes {
  path?: string;
  router: any;
}

class App {
  public app: Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT;
    this.env = NODE_ENV;

    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private async connectDatabase() {
    await connectToDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port} [${this.env}]`);
    });
  }

  public getServer() {
    return this.app;
  }
}

export default App;
