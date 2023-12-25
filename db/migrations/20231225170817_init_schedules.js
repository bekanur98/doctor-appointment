/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('schedules', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
        table.integer('doctor_id').unsigned().notNullable()
        table.datetime('slot').notNullable();

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.foreign('doctor_id').references('id').inTable('doctors').onDelete('CASCADE')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('schedules');
};
