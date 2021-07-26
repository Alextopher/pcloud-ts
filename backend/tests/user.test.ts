import User from '../src/models/user';
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

    describe("/user endpoint", () => {
        beforeAll(async () => {
            // delete "newuser" and create "deleteuser"
            await Promise.all([
                User.findByPk("newuser").then(u => u?.destroy()),
                User.create({ username: "deleteuser", hash: "deleteuser", isAdmin: false })
            ]);
        });

        afterAll(async () => {
            // delete both users (just in case)
            await Promise.all([
                User.findByPk("newuser").then(u => u?.destroy()),
                User.findByPk("deleteuser").then(u => u?.destroy())
            ]);
        })

        it('post /user creates a new user', async () => {
            const res = await agent
                .post('/api/user')
                .send({
                    username: "newuser",
                    password: 'newuser',
                    isAdmin: false
                })
    
            expect(res.statusCode).toEqual(201);
            expect(await User.findByPk("newuser")).toBeTruthy();
    
            await User.findByPk("newuser").then(u => u?.destroy());
        });
    
        it('delete /user/:username removes user from database', async () => {    
            const res = await agent
                .delete("/api/user/deleteuser")
    
            expect(res.statusCode).toEqual(200);
            expect(await User.findByPk("deleteuser")).toBeFalsy();
        });
    });
});
