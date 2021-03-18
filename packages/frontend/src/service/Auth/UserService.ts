import { User } from '../../model/User';
import { Service } from '../Service';

export class UserService extends Service {
    get() {
        return this.api.get<User[]>('/users', { withCredentials: true });
    }

    me() {
        return this.api.post<User>('/users/me', {}, { withCredentials: true });
    }

    save(user: User) {
        return this.api.post<boolean>('/users', user);
    }

    confirm(token: string) {
        return this.api.post('/users/confirm/' + token);
    }
}
