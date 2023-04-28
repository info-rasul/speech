import { AxiosInstance } from 'axios';
import { get, set, remove } from 'local-storage';

import { Http } from './httpInit';
import { loginData } from './interfaces/mainCommons';
import { ResponseWrapper, ErrorWrapper } from './utils';
import { Token } from './utils/interface';

export class AuthService {
  static request(status = { auth: false }): AxiosInstance {
    return new Http(status).init();
  }

  static async makeLogin({
    login,
    password,
  }: loginData): Promise<ResponseWrapper<Token>> {
    try {
      const response = await this.request().post<Token>(
        'login',
        { login, password },
        { withCredentials: true }
      );

      setAuthData({ token: response.data.token });

      return new ResponseWrapper({
        response: response,
        data: response.data,
      });
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  static async makeLogout(): Promise<void> {
    try {
      await this.request({ auth: true }).post(
        'logout',
        {},
        { withCredentials: true }
      );
      resetAuthData();
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  static setBearer(token: string): void {
    set('token', `Bearer ${token}`);
  }

  static getBearer(): string {
    return get('token');
  }
}

const setAuthData = ({ token }: Token) => {
  AuthService.setBearer(token);
};

const resetAuthData = () => {
  remove('token');
};
