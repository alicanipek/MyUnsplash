import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    Id: string;

    @Column({ unique: true })
    UserName: string;

    @Column({ unique: true })
    Email: string;

    @Column()
    Password: string;
}
