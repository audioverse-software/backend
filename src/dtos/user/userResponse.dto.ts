import { Expose } from "class-transformer";



export class UserResponseDto {
    @Expose()
    username!: string;
    @Expose()
    avatar_url?: string | null;
    @Expose()
    interests?: string[] | null;
    @Expose()
    bio?: string | null;
    @Expose()
    created_at?: Date;
    @Expose()
    updated_at?: Date;
}