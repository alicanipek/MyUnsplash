import express from 'express';
import { categoryController } from '../controllers';
import { checkAuth } from '../middlewares/AuthChecker';

export const CategoryRouter = express.Router({
  strict: true,
});

CategoryRouter.get('/', [checkAuth], categoryController.all);

CategoryRouter.post('/', [checkAuth], categoryController.save);

CategoryRouter.get('/:categoryId', [checkAuth], categoryController.get);
