import { Request, Response } from "express";
import { UserService } from "@/services/users/UserService";
import { IUser } from "@/interfaces/IUser";
import { formatResponse } from "@/utils/response";

const userService: UserService = new UserService();
export class UserController {
  // constructor() {
  //   this.userService = new UserService();
  // }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(formatResponse(users));
    } catch (error: any) {
      console.log(error);
      res.status(500).json(formatResponse(null, error.message));
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(
        Number.parseInt(req.params.id)
      );
      if (!user) {
        return res.status(404).json(formatResponse(null, "User not found"));
      }
      res.json(formatResponse(user));
    } catch (error: any) {
      res.status(500).json(formatResponse(null, error.message));
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const userData: IUser = req.body;
      const newUser = await userService.createUser(userData);
      res.status(201).json(formatResponse(newUser));
    } catch (error: any) {
      res.status(400).json(formatResponse(null, error.message));
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await userService.updateUser(
        Number.parseInt(req.params.id),
        req.body
      );
      if (!updatedUser) {
        return res.status(404).json(formatResponse(null, "User not found"));
      }
      res.json(formatResponse(updatedUser));
    } catch (error: any) {
      res.status(400).json(formatResponse(null, error.message));
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number.parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json(formatResponse(null, error.message));
    }
  }
}
