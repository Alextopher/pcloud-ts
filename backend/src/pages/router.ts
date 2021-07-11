import express from 'express';
import { indexRouter } from './index';

export const pageRouter = express.Router({
    strict: true
});

pageRouter.use('/', indexRouter);
