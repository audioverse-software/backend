import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateNotificationDTO {
    @IsString()
    @IsNotEmpty()
    title!: string;
    @IsString()
    @IsNotEmpty()
    body!: string;
    @IsNumber()
    userId!: number;
}