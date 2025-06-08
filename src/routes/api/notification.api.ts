import { NotificationController } from "@/controllers/notification/notification.controller";
import { Request, Response, Router } from "express";


export class NotificationApis {

    private readonly notificationController: NotificationController;
    private readonly router: Router;
    constructor() {
        this.notificationController = new NotificationController();
        this.router = Router();
    }


    setRouter() {
        this.router.post("/", (req: Request, res: Response) => this.notificationController.createNotification(req, res));
        this.router.get("/:id/user/:userId", (req: Request, res: Response) => this.notificationController.getASpecificUserNotification(req, res));
        this.router.get("/user/:userId", (req: Request, res: Response) => this.notificationController.getUserNotification(req, res));
        this.router.patch("/update", (req: Request, res: Response) => this.notificationController.updateNotification(req,res));
        this.router.delete("/:id/user/:userId", (req: Request, res: Response) => this.notificationController.deleteNotification(req, res));
        this.router.delete("/user/:userId", (req: Request, res: Response) => this.notificationController.deleteNotifications(req, res));
    }

    getRouer(){
        this.router;
    }

}