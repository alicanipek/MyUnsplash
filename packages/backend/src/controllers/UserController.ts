import { UserService } from './../services/UserService';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
    userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public async all(req: Request, response: Response) {
        let users = await this.userService.GetAll();
        return response.status(200).json(users);
    }

    public async save(request: Request, response: Response) {
        if (Object.keys(request.body).length === 0) {
            return response.status(400).end();
        }
        let user = User.create(request.body as User);
        if (!user || Object.keys(user).length === 0) {
            return response.status(400).end();
        }
        user = await this.userService.Save(user);
        return user
            ? response.status(200).json(user)
            : response.status(400).json(user);
    }

    public async get(request: Request, response: Response) {
        const userId = request.params['userId'];
        let user = await this.userService.Get(userId);
        return response.status(200).json(user);
    }
}
