import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Record<string, Knex.Config> = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST_MYSQL,
      database: process.env.DATABASE_NAME_MYSQL,
      user: process.env.DATABASE_USERNAME_MYSQL,
      port: Number(process.env.DATABASE_PORT_MYSQL) || 3306,
      password: process.env.DATABASE_PASSWORD_MYSQL,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
