import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export class UserService {
    async Save(user: User): Promise<User> {
        let u = getRepository(User)
            .save(user)
            .catch((err) => null);
        return u;
    }

    async GetAll(): Promise<User[]> {
        return getRepository(User).find();
    }

    async Get(userId: string): Promise<User> {
        let userDb = getRepository(User).findOne(userId);
        return userDb;
    }
}
