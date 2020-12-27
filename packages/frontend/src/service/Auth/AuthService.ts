import axios from 'axios';
import { User } from '../../model/User';
import { Service } from '../Service';

export class AuthService extends Service {
    async login(user: User): Promise<boolean> {
        return await this.api.post('/auth/login', user, {
            withCredentials: true,
        });
    }
    async loggedIn(): Promise<boolean> {
        let t = await this.api.post(
            '/auth/loggedIn',
            {},
            {
                withCredentials: true,
            }
        );
        return t.data;
    }

    async get() {
        return this.api.get('/users', { withCredentials: true });
    }

    async logout(): Promise<boolean> {
        return this.api.get('/auth/logout', {
            withCredentials: true,
        });
    }
}
