import express from "express";
import bcrypt from "bcryptjs";

import User from "./models/user";
import Session from "./models/session";
import DownloadInvite from "./models/download_invite";

import { apiRouter } from "./api/router";

const app = express();
const PORT = 3000;

app.use("/api", apiRouter);
app.use(express.static("static"));
app.get("*", (_, res) => {
  res.sendFile("static/index.html", { root: __dirname + "../../.." });
});

if (process.env.NODE_ENV !== "test") {
  Promise.all([
    User.sync({ force: true }),
    DownloadInvite.sync({ force: true }),
    Session.sync({ force: true }),
  ]).then(() => {
    User.create({
      username: "admin",
      hash: bcrypt.hashSync("admin"),
      isAdmin: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  });
}

export default app;
