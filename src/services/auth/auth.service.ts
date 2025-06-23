import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  TokenPayload,
} from "../../interfaces/auth.interface";
import { UserRepository } from "../../repositories/users/UserRepository";

export class AuthService {
  private userRepository = new UserRepository();

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByUsername(
      registerDto.username
    );
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userRepository.create({
      username: registerDto.username,
      password: hashedPassword,
      interests: registerDto.interests,
      bio: registerDto.bio,
    });

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        interests: user.interests,
        bio: user.bio,
        avatar_url: user.avatar_url,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByUsername(loginDto.username);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        interests: user.interests,
        bio: user.bio,
        avatar_url: user.avatar_url,
      },
    };
  }

  private generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      username: user.username,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    });
  }
}
