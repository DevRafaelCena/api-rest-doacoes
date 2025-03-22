import { Knex } from 'knex';
import KnexConstructor from 'knex';
import config from '../knexfile';

const knexConfig = config as Record<string, Knex.Config>;

const knex = KnexConstructor(knexConfig.development);

export default knex;
