/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable("theaters");

  if (!tableExists) {
    await knex.schema.createTable("theaters", (table) => {
      table
        .uuid("theater_id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name").notNullable();
      table.string("address_line_1").notNullable();
      table.string("address_line_2");
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("zip").notNullable();
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const tableExists = await knex.schema.hasTable("theaters");

  if (tableExists) {
    await knex.schema.dropTable("theaters");
  }
};
