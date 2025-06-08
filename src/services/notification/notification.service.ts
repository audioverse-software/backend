import { AppDataSource } from "@/config/database";
import { Notification } from "@/entities/Notification";
import { User } from "@/entities/User";
import { Repository } from "typeorm";
import { UserService } from "../users/UserService";
import { plainToInstance } from "class-transformer";
import { CreateNotificationDTO } from "@/dtos/notification/createNofication.dto";





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
    }
}