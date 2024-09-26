import { camelCase, snakeCase } from 'lodash-es';

export class Adapter {
  private static value: unknown;

  static from<Source>(originData: Source) {
    this.value = originData;
    return this;
  }

  static to<Input, Output>(mapperCallback: (value: Input) => Output) {
    const transformed = mapperCallback(this.value as Input);
    return transformed;
  }
}

export function toCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: Record<string, unknown>, key: string) => {
      result[camelCase(key)] = toCamelCase((obj as Record<string, unknown>)[key]);
      return result;
    }, {});
  }
  return obj;
}

export function toSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v));
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: Record<string, unknown>, key: string) => {
      result[snakeCase(key)] = toSnakeCase((obj as Record<string, unknown>)[key]);
      return result;
    }, {});
  }
  return obj;
}
