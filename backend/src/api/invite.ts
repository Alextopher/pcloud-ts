import express from "express";
import moment from "moment";
import crypto from "crypto";
import Invite from "../models/invite";
import base64url from "base64url";

import { authenticate } from "./auth";

export const inviteRouter = express.Router({
  strict: true,
});

inviteRouter.get("/", authenticate, async (req, res) => {
  // Get all invite links
  let time = new Date();

  let result = (await Invite.findAll()).map((invite) => {
    // Clear old links (could be made a bulk operation)
    if (
      (invite.uses && invite.uses <= 0) ||
      (invite.expires && invite.expires < time)
    ) {
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

inviteRouter.post("/", authenticate, async (req, res) => {
  if (!req.body.path) {
    return res.sendStatus(400);
  }

  // Generate random key
  let key = base64url.encode(crypto.randomBytes(18));

  // Convert expires field to actual time
  let expires = req.body.expires
    ? moment().add(req.body.expires, "minutes").toDate()
    : undefined;

  let invite = {
    key: key,
    path: req.body.path,
    expires: expires,
    uses: req.body.uses,
  };

  Invite.create(invite);
  res.status(201);
  res.send(key);
});

inviteRouter.get("/:key", async (req, res) => {
  let invite = await Invite.findByPk(req.params.key);

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

inviteRouter.delete("/:key", authenticate, async (req, res) => {
  let invite = await Invite.findByPk(req.params.key);

  if (!invite) {
    return res.sendStatus(400);
  }

  invite.destroy();
  res.sendStatus(200);
});
