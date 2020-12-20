import { userController } from '../controllers';
import express, { Request, Response } from 'express';

export const router = express.Router({
    strict: true,
});

router.get('/users', (req: Request, res: Response) => {
    userController.all(req, res);
});

router.get('/user/:userId', (req: Request, res: Response) => {
    userController.get(req, res);
});

router.post('/users', (req: Request, res: Response) => {
    userController.save(req, res);
});
