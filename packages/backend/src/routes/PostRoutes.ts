import express from 'express';
import { upload } from '../services/uploader';
import { postController } from '../controllers';
import { checkAuth } from '../middlewares/AuthChecker';

export const PostRouter = express.Router({
  strict: true,
});

PostRouter.get('/', [checkAuth], postController.all);

PostRouter.post('/', [checkAuth], upload.single('post'), postController.save);

PostRouter.get('/:postId', [checkAuth], postController.get);
