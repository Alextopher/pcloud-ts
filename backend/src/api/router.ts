import express from 'express';
import cookieParser from 'cookie-parser';

import { authRouter } from './auth';
import { userRouter } from './user';
import { inviteRouter } from './invite';
import { redirectRouter } from '../redirect';
import makeFileServer from './fileserver';

export const apiRouter = express.Router({
    strict: true
});

apiRouter.use(cookieParser());
apiRouter.use(express.json());

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/invite', inviteRouter);
apiRouter.use('/redirect', redirectRouter);
apiRouter.use('/public', makeFileServer("storage/public", false, true));
apiRouter.use('/private', makeFileServer("storage/private", false, false));
apiRouter.get('/coffee', (_, res) => res.sendStatus(418));