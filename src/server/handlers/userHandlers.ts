import { rest } from 'msw';
import { sleep } from '../utils';
import { user } from '../data/user';

export const userHandlers = [
  rest.get('/user', async (_, res, ctx) => {
    await sleep(300);

    return res(ctx.status(200), ctx.json({ ...user }));
  }),
];
