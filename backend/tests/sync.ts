import bcrypt from "bcryptjs";

import User from "../src/models/user";
import Session from "../src/models/session";
import DownloadInvite from "../src/models/download_invite";

export default async function syncDB() {
  await Promise.all([User.sync(), Session.sync(), DownloadInvite.sync()]);

  if (!(await User.findByPk("admin"))) {
    await User.create({
      username: "admin",
      hash: bcrypt.hashSync("admin"),
      isAdmin: true,
    });
  }

  if (!(await User.findByPk("user"))) {
    await User.create({
      username: "user",
      hash: bcrypt.hashSync("user"),
      isAdmin: false,
    });
  }
}
