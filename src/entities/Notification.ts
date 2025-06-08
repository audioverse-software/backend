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
        name: '',
        type: 'text',
        nullable: false
    })
    body!: string;

    @Column({
        type: 'enum',
        default: "unread",
    })
    status!: "unread" | "read" | "archived";

    @Column()
    @ManyToOne(() => User, (user) => user.id)
    user_id!: number;
}