/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

    await knex.schema.createTable("critics", (table) => {
    table.uuid("critic_id").primary().defaultTo(knex.raw("(lower(hex(randomblob(16))))"));
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
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
