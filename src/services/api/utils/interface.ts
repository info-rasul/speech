import { AxiosResponse } from 'axios';

export interface ResWrapper<T> {
  response: AxiosResponse;
  data: T;
  total?: number;
  message?: string;
}

export interface AuthStatus {
  auth: boolean;
}

export interface Token {
  token: string;
}

export interface ResponseUpdate {
  message: string;
  data: {
    id: number;
  };
}
