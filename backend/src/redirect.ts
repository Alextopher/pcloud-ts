import express from "express";
import DownloadInvite from "./models/download_invite";

export const redirectRouter = express.Router({
  strict: true,
});

redirectRouter.get("/:key", async (req, res) => {
  let invite = await DownloadInvite.findByPk(req.params.key);

  if (!invite) {
    res.sendStatus(404);
    return;
  }

  // check if the invite has expired
  if (invite.expires && invite.expires < new Date()) {
    // remove from database
    invite.destroy();
    res.sendStatus(404);
    return;
  }

  // check if all uses have been used
  if (invite.uses && invite.uses <= 0) {
    invite.destroy();
    res.sendStatus(404);
    return;
  }

  res.redirect(invite.path);

  // After using the last invite destory it
  if (invite.uses) {
    if (invite.uses == 1) {
      invite.destroy();
    } else {
      invite.decrement("uses");
    }
  }
});
