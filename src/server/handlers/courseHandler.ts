import { rest } from 'msw';
import { sleep } from '../utils';
import { hotCourses } from '../data/course';

export const courseHandlers = [
  rest.get('/course/hot', async ({ url }, res, ctx) => {
    await sleep(300);
    const DEFAULT_COUNT = 3;

    const count = Number(url.searchParams.get('count') ?? DEFAULT_COUNT);

    return res(ctx.status(200), ctx.json({ course_list: hotCourses.slice(0, count) }));
  }),
];
