import { Sequelize } from 'sequelize';
import pg from 'pg';
import { config } from '@/src/config';

const sequelize = new Sequelize({
  database: config.postgresDb,
  username: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  port: Number(config.dbPort),
  dialect: "postgres",
  dialectModule: pg,
});

export { sequelize };
