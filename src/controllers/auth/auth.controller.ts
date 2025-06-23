import { Request, Response } from "express";
import { AuthService } from "../../services/auth/auth.service";
import { LoginDto, RegisterDto } from "../../interfaces/auth.interface";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const registerDto: RegisterDto = req.body;
      const result = await this.authService.register(registerDto);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Username already exists") {
          return res.status(409).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginDto: LoginDto = req.body;
      const result = await this.authService.login(loginDto);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid credentials") {
          return res.status(401).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
