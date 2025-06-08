import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";



@Entity({
    name: 'notifications'
})
export class Notification {
    @PrimaryGeneratedColumn('identity')
    id!: number;
    @Column({
        name: 'title',
        type: 'varchar',
        nullable: false
    })
    title!: string;
    @Column({
        type: 'varchar',
        nullable: false
    })
    body!: string;

    @Column({
        type: 'varchar',
        default: "unread",
    })
    status!: "unread" | "read" | "archived";

    @ManyToOne(() => User, (user) => user.id)
    userKeyId!: number;
}