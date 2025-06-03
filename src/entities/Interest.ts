import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Interest {
    
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: "varchar"})
    image_url!: string;
    @Column({type: "varchar"})
    status!: "inactive" | "active" | "pending";
}