// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true })
  username: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 512, nullable: true })
  avatar_url?: string;

  @Column('simple-array', { nullable: true })
  interests?: string[];

  @Column('text', { nullable: true })
  bio?: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}