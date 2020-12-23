import express from 'express';
import { postController } from '../controllers';
import { checkAuth } from '../middlewares/AuthChecker';

export const PostRouter = express.Router({
    strict: true,
});

PostRouter.get('/', [checkAuth], postController.all);

PostRouter.post('/', [checkAuth], postController.save);

PostRouter.get('/:postId', [checkAuth], postController.get);
