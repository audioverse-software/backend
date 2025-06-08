import { CreateNotificationDTO, UpdateNotification } from "@/dtos/notification/notification.dto";
import { NotificationService } from "@/services/notification/notification.service";
import { Request, Response } from "express";


export class NotificationController {

    private readonly notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }


    async createNotification(req: Request, res: Response) {
        try{
            const createNotification: CreateNotificationDTO = req.body;
            const response = await this.notificationService.createNotification(createNotification);
            res.status(201).json(response);

        }catch(error) {
            res.status(401).json({error});
        }
    }

    async getASpecificUserNotification(req: Request, res: Response) {
        try{
            const notificationId: number = parseInt(req.params.id);
            const userId: number = parseInt(req.params.userId);

            const response = await this.notificationService.getNotificationById(notificationId, userId);

            res.status(200).json(response);
        }catch(error) {
            res.status(403).json({error})
        }
    }

    async getUserNotification(req: Request, res: Response) {

        try{
            const userId: number = parseInt(req.params.userId);
            const status: any = req.query.status;

            const response = await this.notificationService.getUserNotication(userId, status);

            res.status(200).json(response);
        }catch(error){
            res.status(401).json({error});
        }
    }

    async updateNotification(req: Request, res: Response) {
        try{
            const updateNotificationDto: UpdateNotification = req.body;
            const response = await this.notificationService.updateNotication(updateNotificationDto);

            res.status(200).json(response);
        }catch(error) {
            res.status(403).json({error})
        }
    }

    async deleteNotification(req: Request, res: Response) {
        try{
            const id: number = parseInt(req.params.id);
            const userId: number = parseInt(req.params.userId);

            const response = await this.notificationService.deleteNotification(id, userId);

            res.status(200).json(response);
        }catch(error) {
            res.status(401).json({error});
        }
    }

    async deleteNotifications(req: Request, res: Response) {
        try{
            const userId: number = parseInt(req.params.userId);
            const status: any = req.query.status;

            const response = await this.notificationService.deleteNotifications(userId, status);

            res.status(200).json(response);
        }catch(error) {
            res.status(402).json({error});
        }
    }
}