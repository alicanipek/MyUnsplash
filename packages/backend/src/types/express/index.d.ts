import { User } from './../../entity/User';
import { session } from 'express-session';
declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}
