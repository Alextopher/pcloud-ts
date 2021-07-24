import express from 'express';
import cookieParser from 'cookie-parser';

import { authRouter } from './auth';
import { userRouter } from './user';
import { inviteRouter } from './invite';
import { publicRouter } from './public';

export const apiRouter = express.Router({
    strict: true
});

apiRouter.use(cookieParser());
apiRouter.use(express.json());

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/invite', inviteRouter);
apiRouter.use('/i', inviteRouter);
apiRouter.use('/public', publicRouter);