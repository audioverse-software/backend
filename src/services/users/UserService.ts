import { UserRepository } from "@/repositories/users/UserRepository";
import { IUser } from "@/interfaces/IUser";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository = new UserRepository();

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async updateUser(
    id: number,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}
