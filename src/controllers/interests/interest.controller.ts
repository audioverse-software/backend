import { InterestService } from "@/services/interest/InterestService";
import { Request, Response } from "express";



export class InterestController {

    private readonly interestService: InterestService;

    constructor() {
        this.interestService = new InterestService();
    }

    async createInterest(req: Request, res: Response) {
        const { imageUrl } = req.body;
        try {
            const newInterest = await this.interestService.createInterest(imageUrl);
            res.status(201).json(newInterest);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }   

    async updateInterest(req: Request, res: Response) {
        try {
            const interestId = Number.parseInt(req.params.id);
            const interestData = req.body;
            const updatedInterest = await this.interestService.updateInterest(interestId, interestData);
            res.json(updatedInterest);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllInterests(req: Request, res: Response) {
        try {
            const interests = await this.interestService.getAllInterests();
            res.json(interests);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async getInterestById(req: Request, res: Response) {
        try {
            const interestId = Number.parseInt(req.params.id);
            const interest = await this.interestService.getInterestById(interestId);
            res.json(interest);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
    async deleteInterest(req: Request, res: Response) {
        const interestId = Number.parseInt(req.params.id);
        try {
            await this.interestService.deleteInterest(interestId);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}