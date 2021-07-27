import express from "express";
import path from 'path';
import fs from 'fs';

import { authenticate } from "./auth";
import fileUpload from "express-fileupload";

export const publicRouter = express.Router({
    strict: true
});

publicRouter.use(fileUpload({
    useTempFiles: true
}));

publicRouter.get('/*', (req, res) => {
    let resolved = path.resolve(req.path);
    let p = "storage/public" + resolved;

    fs.stat(p, (err, stats) => {
        if (err) {
            return res.sendStatus(404);
        }

        if (stats.isDirectory()) {
            // get stats of all children
            fs.readdir(p, (err, files) => {
                if (err) {
                    return res.sendStatus(500);
                }

                let stats = files.map(file => {
                    let stat = fs.statSync(p + '/' + file);
                    let s = {
                        size: stat.size,
                        mtime: stat.mtime,
                        birthtime: stat.birthtime,
                        isFile: stat.isFile(),
                        isDirectory: stat.isDirectory()
                    };
                    return {name: file, stats: s}
                });

                res.setHeader("Content-Type", " application/json");
                res.send(stats);
            });
        } else {
            // show or download file
            if (req.query.download === undefined) {
                res.setHeader("Content-Disposition", "inline");
            } else {
                res.setHeader("Content-Disposition", "attachment");
            }

            res.sendFile(p, { root: __dirname + "../../../" });
        }
    });
});

publicRouter.post('/*', authenticate, (req, res) => {
    if (req.files === undefined || req.files.upload === undefined) {
        return res.sendStatus(400);
    }

    if (req.files.upload instanceof Array) {
        return res.sendStatus(400);
    } else {
        let file = req.files.upload;

        let resolved = path.resolve(req.path);
        let p = "storage/public" + resolved + req.files.upload.name;

        fs.stat(p, (err, _) => {
            if (err === null) {
                return res.sendStatus(409); // Conflict
            } else {
                file.mv(p);
                return res.sendStatus(201); // Created
            }
        })
    }
});
