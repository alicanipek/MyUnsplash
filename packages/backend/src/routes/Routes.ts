import express from 'express';
import { authController, userController } from '../controllers';
import { checkJwt } from '../middlewares/Jwt';

export const router = express.Router({
    strict: true,
});

router.post('/login', authController.login);

router.get('/users', [checkJwt], userController.all);

router.post('/users', userController.save);

router.get('/user/:userId', [checkJwt], userController.get);
