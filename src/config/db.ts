import Knex  from 'knex';

const config = require('../knexfile')
export const db = Knex(config as Knex.Config)