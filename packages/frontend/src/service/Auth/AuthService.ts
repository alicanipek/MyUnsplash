import { User } from '../../model/User';
import { Service } from '../Service';

export class AuthService extends Service {
  login(user: User): Promise<boolean> {
    return this.api.post('/auth/login', user, {
      withCredentials: true,
    });
  }

  async loggedIn(): Promise<boolean> {
    const t = await this.api.post(
      '/auth/loggedIn',
      {},
      {
        withCredentials: true,
      },
    );
    return t.data;
  }

  get() {
    return this.api.get('/users', { withCredentials: true });
  }

  logout(): Promise<boolean> {
    return this.api.get('/auth/logout', {
      withCredentials: true,
    });
  }
}
