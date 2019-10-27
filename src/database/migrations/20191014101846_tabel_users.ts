import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('password', 60).notNullable()
        table.boolean('is_active').notNullable().defaultTo(true)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users')
}

