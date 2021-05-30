import express from 'express';
import { PostRouter } from './PostRoutes';
import { CategoryRouter } from './CategoryRoutes';
import { UserRouter } from './UserRoutes';
import { AuthRouter } from './AuthRoutes';

export const router = express.Router({
  strict: true,
});

router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/category', CategoryRouter);
router.use('/posts', PostRouter);
