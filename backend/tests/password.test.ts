import request from 'supertest';
import app from '../src/index';

import User from '../src/models/user';
import syncDB from './sync';

describe('Password Endpoint', () => {
    let agent = request.agent(app);

    beforeAll(async () => {
        await syncDB();

        const res = await agent
            .post('/api/auth/login')
            .send({
                username: "admin",
                password: 'admin'
            })

        expect(res.statusCode).toEqual(200);
        expect(res.headers['set-cookie'][0].startsWith('session'));
    });

    it('/user/admin/password 404s with wrong args', async () => {
        const res = await agent
            .post('/api/user/admin/password')
            .send({
                wrong: "thing"
            })
        expect(res.statusCode).toEqual(400);
    });

    it('/user/admin/password updates password', async () => {
        const oldhash = (await User.findByPk("admin"))!.hash;

        const res = await agent
            .post('/api/user/admin/password')
            .send({
                oldpass: "admin",
                newpass: "admin1"
            })
        expect(res.statusCode).toEqual(200);

        const newHash = (await User.findByPk("admin"))!.hash;

        expect(oldhash !== newHash);

        User.findByPk("admin").then((user) => {
            user!.set("hash", oldhash);
            user!.save();
        })
    })
});
