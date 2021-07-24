import { Sequelize } from 'sequelize';

let db = process.env.NODE_ENV == "test" ? 'test.sqlite' : 'database.sqlite';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: db,
    logging: process.env.NODE_ENV !== "test"
});

export { Sequelize, sequelize };