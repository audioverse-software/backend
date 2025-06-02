import { AppDataSource } from "@/config/database";
import { Interest } from "@/entities/Interest";
import { IInterest } from "@/interfaces/iInterest";
import { Repository } from "typeorm";



export class InterestService {
    private readonly interestRepository: Repository<Interest>;

    constructor() {
        this.interestRepository = AppDataSource.getRepository(Interest);
    }
async createInterest(imageUrl: string): Promise<IInterest> {
    const interest = this.interestRepository.create({
        image_url: imageUrl,
        status: "pending" // Default status
    });
    return await this.interestRepository.save(interest);
}

async updateInterest(id: number, interestData: Partial<IInterest>): Promise<IInterest | null> {
    const foundInterest: Interest | null = this.interestRepository.findOneBy({ id });
    if (!foundInterest) {
        return null;
    }
}




}