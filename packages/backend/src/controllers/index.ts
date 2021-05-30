import { AuthController } from './AuthController';
import { CategoryController } from './CategoryController';
import { PostController } from './PostController';
import { UserController } from './UserController';

const userController = new UserController();
const authController = new AuthController();
const categoryController = new CategoryController();
const postController = new PostController();

export {
  userController, authController, categoryController, postController,
};
