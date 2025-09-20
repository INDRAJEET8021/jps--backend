import App from "./app";
import IndexRoute from "@routes/index.route";
import UserRoute from "@routes/user.route";
import validateEnv from "@utils/validateEnv";

// Validate essential environment variables before starting
validateEnv();

// Define all routes
const routes = [new IndexRoute(), new UserRoute()];

// Create App instance
const app = new App(routes);

// Start the server
app.listen();
