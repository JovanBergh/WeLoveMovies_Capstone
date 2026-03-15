const { default: knex } = require("knex");
const db = require("../db/connection");

const COLUMNS = [
  "m.movie_id as id",
  "m.title",
  "m.runtime_in_minutes",
  "m.rating",
  "m.description",
  "m.image_url",
];

async function list(is_showing) {
  return db("movies as m")
    .select(COLUMNS)
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id");
      }
    });
}

async function read(movie_id) {
  return await db("movies as m").select(COLUMNS).where({ movie_id });
}

module.exports = {
  list,
  read,
};
