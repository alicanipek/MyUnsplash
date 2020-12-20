import { AuthController } from './AuthController';
import { UserController } from './UserController';

const userController = new UserController();
const authController = new AuthController();

export { userController, authController };
