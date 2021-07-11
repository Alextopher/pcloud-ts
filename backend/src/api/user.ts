import express from 'express';
import User from '../models/user';

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