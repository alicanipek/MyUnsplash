import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export class AuthController {
  async login(request: Request, response: Response) {
    const userRequest = User.create(request.body as User);

    if (!userRequest.UserName || !userRequest.Password) {
      response.status(400).send();
      return;
    }

    let user = new User();
    const userRepository = getRepository(User);
    try {
      user = await userRepository.findOneOrFail({
        where: { UserName: userRequest.UserName },
      });
    } catch (error) {
      response.status(401).send(error);
      return;
    }

    const checkPassword = await bcrypt.compare(
      userRequest.Password,
      user.Password,
    );
    if (!checkPassword) {
      response.status(401).send('password wrong');
      return;
    }

    request.session.user = user;

    response.sendStatus(200);
  }

  async logout(request: Request, response: Response) {
    if (request.session.user && request.cookies.user_sid) {
      request.session.destroy((err) => {
        if (err) {
          response.sendStatus(500);
        } else {
          response.clearCookie('user_sid');
          response.sendStatus(200);
        }
      });
    } else {
      response.sendStatus(401);
    }
  }

  async loggedIn(request: Request, response: Response) {
    if (request.session.user && request.cookies.user_sid) {
      response.status(200).send(true);
    } else {
      response.status(200).send(false);
    }
  }
}
