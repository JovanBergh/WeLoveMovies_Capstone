/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable("reviews");

  if (!tableExists) {
    await knex.schema.createTable("reviews", (table) => {
      table
        .uuid("review_id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.text("content");
      table.integer("score").defaultTo(0);
      table.uuid("movie_id").notNullable();
      table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE"); //delete's with movie removal
      table.uuid("critic_id").notNullable();
      table
        .foreign("critic_id")
        .references("critic_id")
        .inTable("critics")
        .onDelete("SET NULL"); //Preserves review
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const tableExists = await knex.schema.hasTable("reviews");

  if (tableExists) {
    await knex.schema.dropTable("reviews");
  }
};
