import { userController } from '../controllers';
import express, { Request, Response } from 'express';

export const router = express.Router({
    strict: true,
});

router.get('/users', userController.all);

router.post('/users', userController.save);

router.get('/user/:userId', userController.get);
