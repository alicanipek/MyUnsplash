import bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    hashPassword() {
        this.Password = bcrypt.hashSync(this.Password, 12);
    }
}
