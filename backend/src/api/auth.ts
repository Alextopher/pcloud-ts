import express, { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import moment from "moment";

import User from "../models/user";
import Session from "../models/session";

// Adds a new user session to the database
async function createNewSession(
  username: string,
  expires?: Date
): Promise<string> {
  // random 16 byte session
  let key = crypto.randomBytes(16).toString("hex");

  // default expires after 1 hour
  if (!expires) {
    expires = moment().add(1, "h").toDate();
  }

  return await Session.create({
    key: key,
    expires: expires,
    username: username,
  })
    .then(() => key)
    .catch((err) => {
      console.log(err);
      return createNewSession(username, expires);
    });
}

export const authRouter = express.Router({
  strict: true,
});

export const authenticate: RequestHandler = async function (req, res, next) {
  // Require session cookie
  if (!req.cookies.session) {
    return res.sendStatus(403);
  }

  let session = await Session.findByPk(req.cookies.session);

  if (!session) {
    return res.sendStatus(403);
  }

  // check if the session has expired
  if (session.expires < new Date()) {
    session.destroy();
    return res.sendStatus(403);
  }

  session.update("expires", moment().add(1, "h").toDate());
  res.locals.user = await session.getUser();

  next();
};

authRouter.post("/login", async (req, res) => {
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
    res.cookie("session", await createNewSession(req.body.username), {
      maxAge: 360000,
    });
    return res.sendStatus(200);
  } else {
    return res.sendStatus(403);
  }
});

authRouter.post("/signout", authenticate, async (req, res) => {
  if (!req.cookies.session) {
    return res.sendStatus(400);
  }

  Session.findByPk(req.cookies.session).then((s) => {
    s!.destroy();
    res.clearCookie("session");
    res.sendStatus(200);
  });
});
