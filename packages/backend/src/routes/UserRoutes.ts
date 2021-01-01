import express from 'express';
import { userController } from '../controllers';
import { checkAuth } from '../middlewares/AuthChecker';

export const UserRouter = express.Router({
    strict: true,
});

UserRouter.get('/', [checkAuth], userController.all);

UserRouter.post('/me', [checkAuth], userController.me);

UserRouter.post('/', userController.save);

UserRouter.get('/:userId', [checkAuth], userController.get);

UserRouter.post('/confirm/:token', userController.confirm);
