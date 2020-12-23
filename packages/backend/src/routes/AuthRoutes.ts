import express from 'express';
import { authController } from '../controllers';
import { checkAuth } from '../middlewares/AuthChecker';

export const AuthRouter = express.Router({
    strict: true,
});

AuthRouter.post('/login', authController.login);

AuthRouter.post('/logout', [checkAuth], authController.logout);
