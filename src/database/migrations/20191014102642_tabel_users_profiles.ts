import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users_profiles', table => {
        table.integer('user_id').unsigned()
        table.integer('profile_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.foreign('profile_id').references('profiles.id')
        table.primary(['user_id', 'profile_id'])        
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users_profiles')
}

