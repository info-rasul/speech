import axios, { AxiosError } from 'axios';

import { ResWrapper } from './interface';

const getStatusMessage = (status: number): string => {
  let message = '';
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed';
      break;
    case 201:
      message = 'Data successfully created';
      break;
    case 400:
      message = 'Bad Request';
      break;
    case 401:
      message = 'Need auth';
      break;
    case 404:
      message = 'Not found';
      break;
    case 503:
      message = 'Service unavailable. Try again later';
      break;
    default:
      message = 'Something wrong. Client default error message';
      break;
  }
  return message;
};

/**
 * Единый обработчик ответа
 */
export class ResponseWrapper<T> {
  readonly data: T;
  readonly status: number;
  readonly statusMessage: string;

  constructor({ response, data }: ResWrapper<T>) {
    this.data = data ? data : ([] as never);
    this.status = response.status;
    this.statusMessage = getStatusMessage(this.status);
  }
}

/**
 * Обработчик ошибок
 */
export class ErrorWrapper extends Error {
  readonly status: number | undefined;
  readonly statusMessage: string | undefined;

  constructor(error: AxiosError | unknown) {
    super();

    if (axios.isAxiosError(error)) {
      this.status = error?.response?.status ?? 200;
      this.statusMessage = getStatusMessage(this.status);
    }
  }
}
