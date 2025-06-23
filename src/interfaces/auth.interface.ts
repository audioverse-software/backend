export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  interests?: string[];
  bio?: string;
}

export interface TokenPayload {
  userId: number;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    interests?: string[];
    bio?: string;
    avatar_url?: string;
  };
} 