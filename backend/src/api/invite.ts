import express from 'express';
import moment from 'moment';
import crypto from 'crypto';
import DownloadInvite from '../models/download_invite';
import base64url from 'base64url';

import { authenticate } from './auth';

export const inviteRouter = express.Router({
    strict: true
});

inviteRouter.post('/create', authenticate, async (req, res) => {
    if (!req.body.path) {
        res.sendStatus(400);
        return;
    }

    // Generate random key
    let key = base64url.encode(crypto.randomBytes(18));

    // Convert expires field to actual time
    let expires = req.body.expires ? moment().add(req.body.expires, "minutes").toDate() : undefined;

    let invite = {
        key: key,
        path: req.body.path,
        expires: expires,
        uses: req.body.uses
    }

    DownloadInvite.create(invite);
    res.send(key);
});

inviteRouter.get('/', authenticate, async (req, res) => {
    // Get all invite links
    let time = new Date();

    let result = (await DownloadInvite.findAll()).map(invite => {
        // Clear old links (could be made a bulk operation)
        if ((invite.uses && invite.uses <= 0) || (invite.expires && invite.expires < time)) {
            invite.destroy();
            return;
        }

        return {
            key: invite.key,
            path: invite.path,
            expires: invite.expires?.toString(),
            uses: invite.uses?.toString(),
        };
    });

    res.send(JSON.stringify(result));
});

inviteRouter.get('/:key', async (req, res) => {
    let invite = await DownloadInvite.findByPk(req.params.key)

    if (!invite) {
        res.sendStatus(400);
        return;
    }

    let result = JSON.stringify({
        key: invite.key,
        path: invite.path,
        expires: invite.expires?.toString(),
        uses: invite.uses ? invite.uses : -1,
    });

    res.send(result.toString());
});

inviteRouter.delete('/:key', authenticate, async (req, res) => {
    let invite = await DownloadInvite.findByPk(req.params.key)

    if (!invite) {
        res.sendStatus(400);
        return;
    }

    invite.destroy();
    res.sendStatus(200);
});
