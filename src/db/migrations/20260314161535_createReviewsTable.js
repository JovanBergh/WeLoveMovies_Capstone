/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  
    await knex.schema.createTable("reviews", (table) => {
        table.uuid("review_id").primary().defaultTo("uuid_generate_v4()");
        table.text("content");
        table.integer("score").defaultTo(0);
        table.uuid("critic_id").notNullable();
        table.foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("SET NULL"); //Preserves review
        table.uuid("movie_id").notNullable();
        table.foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("CASCADE");
        table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {

  await knex.schema.dropTable("reviews");

};
