import express from 'express';
import history from 'connect-history-api-fallback';
import bcrypt from 'bcryptjs';

import User from './models/user';
import Session from './models/session'
import DownloadInvite from './models/download_invite';

import { apiRouter } from './api/router';

const app = express();
const PORT = 3000;

app.use(history());
app.use(express.static("../frontend/dist"));
app.use('/api', apiRouter);

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
