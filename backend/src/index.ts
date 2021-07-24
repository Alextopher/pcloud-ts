import express from 'express';
import bcrypt from 'bcryptjs';

import User from './models/user';
import Session from './models/session'
import DownloadInvite from './models/download_invite';

import { pageRouter } from './pages/router';
import { apiRouter } from './api/router';

const app = express();
const PORT = 3000;

app.use('/api', apiRouter);
app.use('/', pageRouter);

if (process.env.NODE_ENV !== "test") {
    Promise.all([
        User.sync({force: true}),
        DownloadInvite.sync({force: true}),
        Session.sync({force: true})
    ]).then(() => {
        User.create({username: "mahonec", hash: bcrypt.hashSync("jackson"), isAdmin: true});
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);
        })
    });
}

export default app;