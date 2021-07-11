import express from 'express';
import bcrypt from 'bcryptjs';

import User from './models/user';
import Session from './models/session'
import DownloadInvite from './models/download_invite';

import { pageRouter } from './pages/router';
import { apiRouter } from './api/router';
import { redirectRouter } from './redirect';

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');

app.use('/api', apiRouter);
app.use('/invite', redirectRouter);
app.use('/static', express.static("static"));
app.use('/', pageRouter);

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
