import request from 'supertest';
import app from '../src/index';

describe('Login Endpoint', () => {
    it('/auth/login should succeed with correct creds', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "admin",
                password: 'admin'
            })
        expect(res.statusCode).toEqual(200);
    });

    it('/auth/login should 400 with wrong args', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "admin",
                passwd: 'admin'
            })
        expect(res.statusCode).toEqual(400);
    });

    it('/auth/login should 403 with non existent user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "missing",
                password: 'missing'
            })
        expect(res.statusCode).toEqual(403);
    });

    it('/auth/login should 403 with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "admin",
                password: 'WRONG'
            })
        expect(res.statusCode).toEqual(403);
    });

    it('/auth/login creates a user session', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({
            username: "admin",
            password: 'admin'
        })

        expect(res.headers['set-cookie'][0].startsWith('session'));
    })
});
