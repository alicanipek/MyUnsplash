import bcrypt from 'bcryptjs';
import { Min, MinLength } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['UserName'])
@Unique(['Email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    Id: string;

    @Column()
    @MinLength(3)
    UserName: string;

    @Column()
    Email: string;

    @Column()
    Password: string;

    hashPassword() {
        this.Password = bcrypt.hashSync(this.Password, 12);
    }
}
