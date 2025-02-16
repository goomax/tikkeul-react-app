import { userHandlers } from './userHandlers';
import { courseHandlers } from './courseHandler';

export function handlers() {
  return [...courseHandlers, ...userHandlers];
}
