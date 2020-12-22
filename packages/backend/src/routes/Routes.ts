import express from 'express';
import { authController, userController } from '../controllers';
import { checkAuth } from '../middlewares/AuthChecker';

export const router = express.Router({
    strict: true,
});

router.post('/login', authController.login);

router.post('/logout', [checkAuth], authController.logout);

router.get('/users', [checkAuth], userController.all);

router.post('/users', userController.save);

router.get('/user/:userId', [checkAuth], userController.get);
