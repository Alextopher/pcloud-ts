import express from 'express';
import bcrypt from 'bcryptjs';
import User, { UserInstance } from '../models/user';
import { authenticate } from './auth';

export const userRouter = express.Router({
    strict: true
});

userRouter.get('/', async (_req, res) => {
    let result = (await User.findAll()).map(user => {
        return {
            "username": user.username,
            "isAdmin": user.isAdmin,
        };
    });

    res.send(result);
});

userRouter.post('/', authenticate, async (req, res) => {
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

userRouter.get('/:username', async (req, res) => {
    let result = await User.findByPk(req.params.username).then(user => {
        if (!user) {
            return null;
        } else {
            return {
                "username": user.username,
                "isAdmin": user.isAdmin
            }
        }
    });

    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

// Updates password
userRouter.post("/:username/password", authenticate, async (req, res) => {
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