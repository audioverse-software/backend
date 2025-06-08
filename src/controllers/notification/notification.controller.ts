import { CreateNotificationDTO } from "@/dtos/notification/notification.dto";
import { NotificationService } from "@/services/notification/notification.service";
import { Request, Response } from "express";


export class NotificationController {

    private readonly notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }


    async createNotification(req: Request, res: Response) {
        const createNotification: CreateNotificationDTO = req.body;
        const response = this.notificationService.createNotification(createNotification);
        res.json(response);
    }
}