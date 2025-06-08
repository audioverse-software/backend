import { AppDataSource } from "@/config/database";
import { Notification } from "@/entities/Notification";
import { User } from "@/entities/User";
import { Repository } from "typeorm";
import { UserService } from "../users/UserService";
import { plainToInstance } from "class-transformer";
import { CreateNotificationDTO, NotificationResponseDTO, UpdateNotification } from "@/dtos/notification/notification.dto";





export class NotificationService {

    private readonly notificationRepository: Repository<Notification>;
    private readonly userService: UserService;

    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification);
        this.userService = new UserService();
    }

    // create a new notification
    async createNotification(createNotification: CreateNotificationDTO): Promise<String> {
        // get the user out 
        // call the user service 
        try{
            const user: User = await this.userService.findUserById(createNotification.userId);
        const newNotification = plainToInstance(Notification, {
            ...createNotification,
            userId: user.id
        }, {
            excludeExtraneousValues: true
        });

        // save the nofication
        await this.notificationRepository.save(newNotification);

        return "created successfully...";
    }catch(error) {
        throw new Error(error as string);
    }
    }

    async getNotificationById(id: number, userId: number): Promise<NotificationResponseDTO> {
        // get a particular user notification
        const notification: Notification | null = await this.notificationRepository.findOne({
            where: { id, userId }
        });

        if (!notification) {
            throw new Error("Could not find specified notication");
        }

        return plainToInstance(NotificationResponseDTO, {
            ...notification
        }, {
            excludeExtraneousValues: true
        });
    }

    // async getNoticationByUserId(userId: number): Promise<NotificationResponseDTO[]> {
    //     // assert user exist
    //     await this.userService.findUserById(userId);

    //     // get the list out
    //     const userNotifications: Notification[] = await this.notificationRepository.find({
    //         where: {userId: userId}
    //     });

    //     const userNotificationResponse: NotificationResponseDTO[] = [];

    //     userNotifications.map((notification) => {
    //         userNotificationResponse.push(
    //             plainToInstance(NotificationResponseDTO, {
    //                 ...notification
    //             }, {
    //                 excludeExtraneousValues: true
    //             })
    //         );
    //     });

    //     return userNotificationResponse;
    // }

    async getUserNotication(userId: number, status?: "unread" | "read" | "archived"): Promise<NotificationResponseDTO[]> {
        await this.userService.findUserById(userId);
        
        const foundUserNotifications: Notification[] = status
            ? await this.notificationRepository.find({
                where: { userId: userId, status: status }
            })
            : await this.notificationRepository.find({
                where: { userId: userId }
            });

        const userNotificationResponse: NotificationResponseDTO[] = foundUserNotifications.map((notification) =>
            plainToInstance(NotificationResponseDTO, {
                ...notification
            }, {
                excludeExtraneousValues: true
            })
        );

        return userNotificationResponse;
    }

    async updateNotication(updateNoticationDto: UpdateNotification): Promise<string> {
        try{
        await this.userService.findUserById(updateNoticationDto.userId);

        // get the notification
        const notification: Notification | null = await this.notificationRepository.findOne({
            where: { id: updateNoticationDto.id, userId: updateNoticationDto.userId }
        });

        if (!notification) {
            throw new Error("could not locate notification");
        }

        notification.status = updateNoticationDto.status; 

        this.notificationRepository.save(notification);
        return "updated succesfully...";
    }
    catch(error) {
        throw new Error(error as string);
    }
    }

    async deleteNotification(id: number, userId: number): Promise<string> {
        try {
        await this.userService.findUserById(userId);

        const notification: Notification | null = await this.notificationRepository.findOne({
            where: { id: id, userId: userId }
        });

        if (!notification) {
            throw new Error("could not locate notification");
        }

       
            await this.notificationRepository.delete(notification);
            return "succeessfully deleted...";
        }catch(error) {
            throw new Error(error as string);
        }
    }

    async deleteNotifications(userId: number, status?: "unread" | "read" | "archived"): Promise<string> {

        try {
            await this.userService.findUserById(userId);
        
        const foundUserNotifications: Notification[] = status
            ? await this.notificationRepository.find({
                where: { userId: userId, status: status }
            })
            : await this.notificationRepository.find({
                where: { userId: userId }
            });

            await this.notificationRepository.remove(foundUserNotifications);

            return "all deleted successfully ";
        }catch(error) {
            throw new Error(error as string);
        }
    }
}