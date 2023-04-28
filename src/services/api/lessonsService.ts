import { BaseService } from './baseService';

export class LessonsService extends BaseService {
  static get entity(): string {
    return 'lessons';
  }
}
