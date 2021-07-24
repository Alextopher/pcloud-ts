import express, { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import moment from 'moment';

import User, { UserInstance } from '../models/user';
import Session from '../models/session'

// Adds a new user session to the database
async function createNewSession(username: string, expires?: Date) : Promise<string> {
    // random 16 byte session
    let key = crypto.randomBytes(16).toString('hex');

    // default expires after 1 hour
    if (!expires)
        expires = moment().add(1, 'h').toDate();

    return await Session.create({
        key: key,
        expires: expires,
        username: username,
    })
    .then(() => key)
    .catch((err) => {
        return createNewSession(username, expires);
    })
}

export const authRouter = express.Router({
    strict: true
});

// TODO: Add callback urls
export const authenticate: RequestHandler = async function(req, res, next) {
    // Require session cookie
    if (!req.cookies.session) {
        return res.redirect('/login');
    }

    let session = await Session.findByPk(req.cookies.session);

    if (!session) return res.redirect('/login');

    // check if the session has expired
    if (session.expires < new Date()) {
        return session.destroy();
    }

    session.update("expires", moment().add(1, 'h').toDate());
    res.locals.user = session.user;

    next();
}

authRouter.post('/login', async (req, res) => {
    // logging with username & password
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400);
    }

    // Get username's hash from db
    let user = await User.findByPk(req.body.username);

    if (!user) {
        return res.sendStatus(403);
    }

    // Check password
    if (bcrypt.compareSync(req.body.password, user.hash)) {
        res.cookie("session", await createNewSession(req.body.username), { maxAge: 360000 });
        return res.sendStatus(200);
    } else {
        return res.sendStatus(403);
    }
});

authRouter.post('/create', authenticate, async (req, res) => {
    // get user from session
    let user: UserInstance = res.locals.user;

    // only admins can create users
    let isAdmin = user.isAdmin;

    if (!isAdmin) {
        return res.sendStatus(403);
    }

    // check body
    if (!req.body.username || !req.body.password || !req.body.isAdmin) {
        return res.sendStatus(400);
    }

    let result : Boolean = await User.create({username: req.body.username, hash: bcrypt.hashSync(req.body.password), isAdmin: req.body.isAdmin})
        .then(() => true)
        .catch(() => false);

    // return success
    if (result) {
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
});

authRouter.post("/password", authenticate, async (req, res) => {
    // get user from session
    let user: UserInstance = res.locals.user;

    // check body
    if (!req.body.oldpass || !req.body.newpass) {
        return res.sendStatus(400);
    }

    if (bcrypt.compareSync(req.body.oldpass, user.hash)) {
        user.update("hash", bcrypt.hashSync(req.body.newpass));
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});