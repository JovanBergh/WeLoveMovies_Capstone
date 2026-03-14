const { table } = require("../connection");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

    await knex.schema.createTable("critics", (table) => {
    table.uuid("critic_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("preferred_name").notNullable();
    table.string("surname").notNullable();
    table.string("organization_name").notNullable();
    table.timestamps(true, true);
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {

    await knex.schema.dropTable("critics");

};
