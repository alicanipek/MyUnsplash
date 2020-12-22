import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export class AuthController {
    async login(request: Request, response: Response) {
        //Check if username and password are set
        let userRequest = User.create(request.body as User);

        if (!userRequest.UserName || !userRequest.Password) {
            response.status(400).send();
            return;
        }

        let user = new User();
        //Get user from database
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail({
                where: { UserName: userRequest.UserName },
            });
        } catch (error) {
            response.status(401).send(error);
            return;
        }

        let checkPassword = await bcrypt.compare(
            userRequest.Password,
            user.Password
        );
        //Check if encrypted password match
        if (!checkPassword) {
            response.status(401).send('password wrong');
            return;
        }

        request.session.user = user;

        //Send the jwt in the response
        response.sendStatus(200);
    }

    async logout(request: Request, response: Response) {
        if (request.session.user && request.cookies.user_sid) {
            response.clearCookie('user_sid');
            response.sendStatus(200);
            return;
        } else {
            response.sendStatus(401);
            return;
        }
    }
}
