import express from "express";
import bcrypt from "bcryptjs";
import User, { UserInstance } from "../models/user";
import { authenticate } from "./auth";

export const userRouter = express.Router({
  strict: true,
});

userRouter.get("/", authenticate, async (_req, res) => {
  let result = (await User.findAll()).map((user) => {
    return {
      username: user.username,
      isAdmin: user.isAdmin,
    };
  });

  res.send(result);
});

userRouter.post("/", authenticate, async (req, res) => {
  // get user from session
  let user: UserInstance = res.locals.user;

  // only admins can create users
  let isAdmin = user.isAdmin;

  if (!isAdmin) {
    return res.sendStatus(403);
  }

  // check body
  if (
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.isAdmin === undefined
  ) {
    return res.sendStatus(400);
  }

  let result: Boolean = await User.create({
    username: req.body.username,
    hash: bcrypt.hashSync(req.body.password),
    isAdmin: req.body.isAdmin,
  })
    .then(() => true)
    .catch(() => false);

  // return success
  if (result) {
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

// Special case endpoint where an authenticated user gets results about themself
// WARNING: order matters. `/me` must run be before `/:username`
userRouter.get("/me", authenticate, async (req, res) => {
  let user = res.locals.user;

  let result = {
    username: user.username,
    isAdmin: user.isAdmin,
  };

  res.send(result);
});

userRouter.get("/:username", async (req, res) => {
  let result = await User.findByPk(req.params.username).then((user) => {
    if (!user) {
      return null;
    } else {
      return {
        username: user.username,
        isAdmin: user.isAdmin,
      };
    }
  });

  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

userRouter.delete("/:username", authenticate, async (req, res) => {
  // get user from session
  let user: UserInstance = res.locals.user;

  // only admins can create users
  let isAdmin = user.isAdmin;

  if (!isAdmin) {
    return res.sendStatus(403);
  }

  let status = await User.findByPk(req.params.username)
    .then((user) => {
      if (!user) {
        return 404;
      } else {
        user.destroy();
        return 200;
      }
    })
    .catch((e) => {
      console.log(e);
      return 500;
    });

  res.sendStatus(status);
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
    let newHash = bcrypt.hashSync(req.body.newpass);

    user.set("hash", newHash);
    user
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});
