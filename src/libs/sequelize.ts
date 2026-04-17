import { Sequelize } from 'sequelize';
import pg from 'pg';
import { config } from '@/config';
import { setupModels } from "@/db/models";

const sequelize = new Sequelize({
  database: config.postgresDb,
  username: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  port: Number(config.dbPort),
  dialect: "postgres",
  dialectModule: pg,
  logging: config.nodeEnv === "development" ? console.log : false,
  dialectOptions: {
    ...(config.nodeEnv === "production" && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    })
  },
  pool: config.nodeEnv === "production" ? {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  } : undefined,
});

setupModels(sequelize);

export { sequelize };
