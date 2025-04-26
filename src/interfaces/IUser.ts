export interface IUser {
  id?: number;
  username: string;
  password: string;
  avatar_url?: string | null;
  interests?: string[] | null;
  bio?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
