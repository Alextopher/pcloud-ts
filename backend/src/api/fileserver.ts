import express, { RequestHandler, Router } from "express";
import fileUpload from "express-fileupload";
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { authenticate } from "./auth";

/**
 * A simple {@link RequestHandler} to that goes straight to next
 */
const skip: RequestHandler = async function(_req, _res, next) {
    next();
}

/**
 * Creates a new {@link express.Router} with http `get` and `post` methods to act as a file server
 * @param  {string} storage path on disk to save files
 * @param  {boolean=false} anyoneUpload true if anyone can upload files
 * @param  {boolean=false} anyoneDownload true if anyone can download files
 * @returns Router
 */
const makeFileServer = function(storage: string, anyoneUpload: boolean = false, anyoneDownload: boolean = false): Router  {
    const router = express.Router({
        strict: true
    });

    router.use(fileUpload({
        useTempFiles: true
    }));

    // Optionally add the authenticate middleware
    const upMiddleware = anyoneUpload ? skip : authenticate;
    const downMiddleware = anyoneDownload ? skip : authenticate;

    router.get('/*', downMiddleware, (req, res) => {
        let resolved = path.resolve(req.path);
        let p = storage + resolved;
    
        fs.stat(p, (err, stats) => {
            if (err) {
                return res.sendStatus(404);
            }
    
            if (stats.isDirectory()) {
                // if we're trying to download an entire folder send a zip file
                if (!req.query.download) {
                    const archive = archiver('zip', {
                        zlib: { level: 9 }
                    });

                    archive.directory(p, "folder");
                    archive.finalize().then(() => console.log(archive));
                    res.setHeader("Content-Disposition", "attachment");
                }

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
                if (!req.query.download) {
                    res.setHeader("Content-Disposition", "inline");
                } else {
                    res.setHeader("Content-Disposition", "attachment");
                }
    
                res.sendFile(p, { root: ".." });
            }
        });
    });

    router.post('/*', upMiddleware, (req, res) => {
        if (req.files === undefined || req.files.upload === undefined) {
            return res.sendStatus(400);
        }

        if (req.files.upload instanceof Array) {
            return res.sendStatus(400);
        }

        let file = req.files.upload;
        let resolved = path.resolve(req.path);
        if (req.query.folder !== undefined) {
        } else {
            let p = storage + resolved + '/' + req.files.upload.name;

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

    router.put('/:folder', upMiddleware, (req, res) => {
        let resolved = path.resolve(req.path);
        let p = storage + resolved;

        fs.stat(p, (err, _) => {
            if (err === null) {
                return res.sendStatus(409);
            } else {
                fs.mkdir(p, (err) => {
                    if (err) {
                        return res.sendStatus(500);
                    } else {
                        return res.sendStatus(200);
                    }
                })
            }
        });
    })

    return router;
}

export default makeFileServer;