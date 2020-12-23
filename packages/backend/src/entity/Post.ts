import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    Id!: string;

    @Column()
    ImagePath!: string;

    @Column('simple-array')
    Tags: string[];

    @ManyToMany(() => Category)
    @JoinTable()
    Categories: Category[];

    @ManyToOne(() => User, (User) => User.Posts)
    User: User;
}
