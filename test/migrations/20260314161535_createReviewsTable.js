/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  
    await knex.schema.createTable("reviews", (table) => {
        table.uuid("review_id").primary().defaultTo(knex.raw("lower(hex(randomblob(16)))"));
        table.text("content");
        table.integer("score").defaultTo(0);
        table.uuid("critic_id");
        table.foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("SET NULL"); //Preserves review
        table.uuid("movie_id");
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
