import { camelCase, snakeCase } from 'lodash-es';

export class ApiAdapter {
  static toSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => ApiAdapter.toSnakeCase(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((result: any, key: string) => {
        result[snakeCase(key)] = ApiAdapter.toSnakeCase(obj[key]);
        return result;
      }, {});
    }
    return obj;
  }

  static toCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => ApiAdapter.toCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((result: any, key: string) => {
        result[camelCase(key)] = ApiAdapter.toCamelCase(obj[key]);
        return result;
      }, {});
    }
    return obj;
  }
}
