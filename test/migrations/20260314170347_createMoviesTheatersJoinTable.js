/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    await knex.schema.createTable("movies_theaters", (table) => {
    table.uuid("movie_id");
    table.foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE");
    table.uuid("theater_id");
    table.foreign("theater_id")
        .references("theater_id")
        .inTable("theaters")
        .onDelete("CASCADE");
    table.boolean("is_showing").defaultTo(false);
    table.timestamps(true, true);
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    
  await knex.schema.dropTable("movies_theaters");

};
