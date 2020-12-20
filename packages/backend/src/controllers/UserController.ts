import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export class UserController {
    public async all(req: Request, response: Response) {
        let users = await getRepository(User).find({
            select: ['Id', 'Email', 'UserName'],
        });
        response.send(users);
    }

    public async save(request: Request, response: Response) {
        let user = User.create(request.body as User);

        const errors = await validate(user);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        user.hashPassword();
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            response.status(409).send('username or email already in use');
            return;
        }

        response.status(201).send('User created');
    }

    public async get(request: Request, response: Response) {
        const userId = request.params['userId'];

        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(userId, {
                select: ['Id', 'Email', 'UserName'],
            });
            response.send(user);
        } catch (error) {
            response.status(404).send('User not found');
        }
    }
}
