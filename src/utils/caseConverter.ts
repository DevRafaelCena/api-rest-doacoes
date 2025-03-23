import { camelCase, snakeCase, mapKeys } from 'lodash';

export function toCamelCase<T>(obj: any): T {
  return mapKeys(obj, (_, key) => camelCase(key)) as T;
}

export function toSnakeCase<T>(obj: any): T {
  return mapKeys(obj, (_, key) => snakeCase(key)) as T;
}
