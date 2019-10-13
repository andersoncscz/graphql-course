require('ts-node/register');
require('dotenv').config({ path:'../.env' })

module.exports = {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'migrations',
      tableName: 'knex_migrations',
    }    
}