/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async  function(knex) {
  await knex.schema.createTable("theaters", (table) => {
    table.uuid("theater_id").primary().defaultTo(knex.raw("lower(hex(randomblob(16)))"));
    table.string("name");
    table.string("address_line_1");
    table.string("address_line_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    
  await knex.schema.dropTable("theaters");

};
