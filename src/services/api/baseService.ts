import { AxiosInstance } from 'axios';

import { Http } from './httpInit';
import {
  IObjectCommonString,
  IObjectCommonNumber,
} from './interfaces/mainCommons';
import { ResponseWrapper, ErrorWrapper } from './utils';

export class BaseService {
  static get entity(): string {
    throw new Error('entity getter not defined');
  }

  static request(status = { auth: true }): AxiosInstance {
    return new Http(status).init();
  }
  static async getList<T>(
    parameters: IObjectCommonString | IObjectCommonNumber = {}
  ): Promise<ResponseWrapper<T[]>> {
    try {
      const response = await this.request({ auth: false }).get<T[]>(
        `${this.entity}`,
        { params: { ...parameters } }
      );
      return new ResponseWrapper({ response, data: response.data });
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  static async getById<T>(id: number): Promise<ResponseWrapper<T>> {
    try {
      const response = await this.request({ auth: false }).get<T>(
        `${this.entity}/${id}`
      );
      return new ResponseWrapper({ response, data: response.data });
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }
  static async create<T, F>(data: T): Promise<F> {
    try {
      const response = await this.request({ auth: false }).post<F>(
        `${this.entity}`,
        { ...data }
      );
      return response.data;
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }

  static async update<T>(id: number, data: T): Promise<void> {
    try {
      await this.request({ auth: false }).patch(`${this.entity}/${id}`, {
        ...data,
      });
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }
  static async remove<T, F>(id: number, data?: T): Promise<F> {
    try {
      const response = await this.request({ auth: false }).delete<F>(
        `${this.entity}/${id}`,
        {
          ...data,
        }
      );

      return response.data;
    } catch (error) {
      throw new ErrorWrapper(error);
    }
  }
}
