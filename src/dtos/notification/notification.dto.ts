import { Expose } from "class-transformer";
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

export class UpdateNotification {
    @IsNumber()
    id!: number;
    @IsNumber()
    userId!: number;
    @IsNotEmpty()
    status: any;
}


export class NotificationResponseDTO {

    @Expose()
    title!: string;
    @Expose()
    body!: string;
    @Expose()
    status!: any;
}

