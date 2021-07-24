import request from 'supertest';
import app from '../src/index';
import syncDB from './sync';

describe('Logged out /user', () => {
    beforeAll(async () => {
        await syncDB();
    });

    it('GET `/user` should 403', async () => {
        const res = await request(app)
            .get('/api/user/')
        
        expect(res.statusCode).toEqual(403);
    });
});

describe('Logged in /user', () => {
    let agent = request.agent(app);

    beforeAll(async () => {
        await syncDB()

        const res = await agent
            .post('/api/auth/login')
            .send({
                username: "admin",
                password: 'admin'
            })

        expect(res.statusCode).toEqual(200);
        expect(res.headers['set-cookie'][0].startsWith('session'));
    });

    it('get /user/ should list all users', async () => {
        const res = await agent
            .get('/api/user/')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length === 1);
    });

    it('get /user/:username should return user', async () => {
        const res = await agent
            .get('/api/user/admin')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            "username": "admin",
            "isAdmin": true
        });
    });

    it('get /user/:username 404s on missing user', async () => {
        const res = await agent
            .get('/api/user/missing')
        
        expect(res.statusCode).toEqual(404);
    });

    it('post /user creates a new user', async () => {
        const res = await agent
            .post('/api/user')
            .send({
                username: "test",
                password: 'deleteme',
                isAdmin: false
            })

        expect(res.statusCode).toEqual(201);
    });
});
