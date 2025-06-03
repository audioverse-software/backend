import { AppDataSource } from "@/config/database";
import { Interest } from "@/entities/Interest";
import { IInterest } from "@/interfaces/iInterest";
import { plainToInstance } from "class-transformer";
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
    const SavedInterest =  await this.interestRepository.save(interest);
    return {
        image_url: SavedInterest.image_url,
        status: SavedInterest.status
    }
}

async updateInterest(id: number, interestData: Partial<IInterest>): Promise<IInterest> {
    const foundInterest = await this.interestRepository.findOneBy({ id });
    if (!foundInterest) {
      throw new Error(`Interest with id ${id} not found`);
    }
    this.interestRepository.merge(foundInterest, {
      image_url: interestData.image_url ?? foundInterest.image_url,
      status: interestData.status as 'inactive' | 'active' | 'pending' ?? foundInterest.status,
    });
    const updatedInterest = await this.interestRepository.save(foundInterest);

    return {
        image_url: updatedInterest.image_url,
        status: updatedInterest.status,
    }
  }

async getAllInterests(): Promise<IInterest[]> {
    const interests = await this.interestRepository.find();
    console.log(interests);
    return interests.map(interest => ({
        image_url: interest.image_url,
        status: interest.status
    }));
}

async getInterestById(id: number): Promise<IInterest | null> {
    const interest = await this.interestRepository.findOneBy({ id });
    if (!interest) return null;
    return {
        image_url: interest.image_url,
        status: interest.status
    };
}

async deleteInterest(id: number): Promise<void> {
    const result = await this.interestRepository.delete(id);
    if (result.affected === 0) {
        throw new Error(`Interest with id ${id} not found`);
    }
}

}