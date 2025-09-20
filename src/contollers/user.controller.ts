import UserService from "@services/user.service";
import { Request, Response, NextFunction } from "express";

class UserController {
  private userService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await this.userService.registerUser({
        name,
        email,
        phone,
        password,
      });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.loginUser(req.body);
      res.status(200).json({ message: "Login successful", ...result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default UserController;
