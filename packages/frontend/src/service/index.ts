import { UserService } from './Auth/UserService';
import { AuthService } from './Auth/AuthService';

const authService = new AuthService();
const userService = new UserService();

export { authService, userService };
