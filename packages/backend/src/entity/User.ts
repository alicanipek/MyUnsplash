import bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id!: string;

  @Column({ unique: true })
  @Length(3, 20)
  UserName!: string;

  @Column({ unique: true })
  @IsEmail()
  Email!: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  Password!: string;

  @Column('bool', { default: false })
  Confirmed!: boolean;

  @OneToMany(() => Post, (Post) => Post.User)
  Posts: Post[];

  hashPassword() {
    this.Password = bcrypt.hashSync(this.Password, 12);
  }
}
