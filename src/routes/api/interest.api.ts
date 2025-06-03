import { InterestController } from "@/controllers/interests/interest.controller";
import { Request, Response, Router } from "express";


export class InterestRoutes {

    private readonly router: Router;
    private readonly interestController: InterestController;

    constructor() {
        this.router = Router();
        this.interestController = new InterestController();
        this.setRouter();
    }

    setRouter() {
        this.router.post("/", (req: Request, res: Response) => this.interestController.createInterest(req, res));
        this.router.put("/:id", (req: Request, res: Response) => this.interestController.updateInterest(req, res));
        this.router.get("/", (req: Request, res: Response) => this.interestController.getAllInterests(req, res));
        this.router.get("/:id", (req: Request, res: Response) => this.interestController.getInterestById(req, res));
        this.router.delete("/:id", (req: Request, res: Response) => this.interestController.deleteInterest(req, res));
    }
    getRouter(): Router {
        return this.router;
    }
}