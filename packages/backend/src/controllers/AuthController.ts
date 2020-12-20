import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import jwtSecret from '../config/JwtSecret';
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
        console.log(jwtSecret.jwt_secret);
        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { Id: user.Id, UserName: user.UserName },
            jwtSecret.jwt_secret,
            { expiresIn: '1h' }
        );

        //Send the jwt in the response
        response.send(token);
    }
}
