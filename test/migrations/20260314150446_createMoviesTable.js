/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    await knex.schema.createTable("movies", (table) => {
    table.uuid("movie_id").primary().defaultTo(knex.raw("lower(hex(randomblob(16)))"));
    table.string("title").notNullable();
    table.integer("runtime_in_minutes").notNullable().defaultTo(0);
    table.enum("rating", ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR']);
    table.text("description").notNullable();
    table.string("image_url").notNullable();
    table.timestamps(true, true);
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {

  await knex.schema.dropTable("movies");

};
