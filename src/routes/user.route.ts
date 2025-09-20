import UserController from "contollers/user.controller";
import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "./user.validation";
import validate from "@middlewares/validation.middleware";

class UserRoute {
  public path = "/users";
  public router = Router();
  private userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // POST /users/register
    this.router.post(
      `${this.path}/register`,
      validate(registerUserSchema),
      this.userController.register
    );
    this.router.post(`${this.path}/login`, validate(loginUserSchema),this.userController.login);
  }
}

export default UserRoute;
