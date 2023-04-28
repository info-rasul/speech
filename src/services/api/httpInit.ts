import axios, { AxiosInstance } from 'axios';
import { AuthService } from 'services/api/authService';

import { AuthStatus } from './utils/interface';

const API_URL = process.env.REACT_APP_API_URL;
export class Http {
  public readonly instance: AxiosInstance;
  private readonly isAuth: boolean;

  constructor(status: AuthStatus) {
    this.isAuth = status.auth ?? false;
    this.instance = axios.create({
      baseURL: `${API_URL}`,
    });
  }

  init(): AxiosInstance {
    if (this.isAuth) {
      this.instance.interceptors.request.use(
        (request) => {
          if (request.headers) {
            request.headers.Authorization = AuthService.getBearer();
          }
          // Тут будет запрос на обновление токена
          return request;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }
}
