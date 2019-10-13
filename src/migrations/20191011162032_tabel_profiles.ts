import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('profiles', table => {
        table.increments('id').primary()
        table.string('name').notNullable().unique()
        table.string('label').notNullable()
    }).then(() => {
        return knex('profiles').insert([
            { name: 'common', label: 'Comum' },
            { name: 'admin', label: 'Administrador' },
            { name: 'master', label: 'Master' }
        ])        
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('profiles')
}

