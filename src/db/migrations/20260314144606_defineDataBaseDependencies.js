/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.raw(`
    CREATE TYPE IF NOT EXISTS mpaa_rating AS ENUM ('G', 'PG', 'PG-13', 'R', 'NC-17', 'NR');
  `);

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {

  await knex.raw("DROP EXTENSION uuid-oosp;");

  await knex.raw("DROP TYPE mpaa_rating;");

};
