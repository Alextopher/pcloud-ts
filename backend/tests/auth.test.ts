import request from 'supertest';
import app from '../src/index';

import bcrypt from 'bcryptjs';
import User from '../src/models/user';

describe('Login Endpoint', () => {
    beforeAll(async () => {
        await User.findByPk("mahonec").then(user => {
            if (!user) {
                User.create({ username: "mahonec", hash: bcrypt.hashSync("jackson"), isAdmin: true });
            }
        });
    });

    it('/auth/login should succeed with correct creds', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "mahonec",
                password: 'jackson'
            })
        expect(res.statusCode).toEqual(200);
    });

    it('/auth/login should 400 with wrong args', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "mahonec",
                passwd: 'jackson'
            })
        expect(res.statusCode).toEqual(400);
    });

    it('/auth/login should 403 with non existent user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "jackson",
                password: 'jackson'
            })
        expect(res.statusCode).toEqual(403);
    });

    it('/auth/login should 403 with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "mahonec",
                password: 'WRONG'
            })
        expect(res.statusCode).toEqual(403);
    });
});

describe('Password Endpoint', () => {
    let agent = request.agent(app);

    beforeAll(async () => {
        await User.findByPk("mahonec").then(user => {
            if (!user) {
                User.create({ username: "mahonec", hash: bcrypt.hashSync("jackson"), isAdmin: true });
            }
        });

        const res = await agent
            .post('/api/auth/login')
            .send({
                username: "mahonec",
                password: 'jackson'
            })
        expect(res.statusCode).toEqual(200);
    });

    it('/auth/password 404s with wrong args', async () => {
        const res = await agent
            .post('/api/auth/password')
            .send({
                wrong: "thing"
            })
        expect(res.statusCode).toEqual(400);
    });

    it('/auth/password works', async () => {
        const res = await agent
            .post('/api/auth/password')
            .send({
                wrong: "thing"
            })
        expect(res.statusCode).toEqual(400);
    })
});

describe('User Endpoints', () => {
    beforeAll(async () => {
        await User.findByPk("mahonec").then(user => {
            if (!user) {
                User.create({ username: "mahonec", hash: bcrypt.hashSync("jackson"), isAdmin: true });
            }
        });
    });

    it('/user/ should list all users', async () => {
        const res = await request(app)
            .get('/api/user/')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length === 1);
    });
});