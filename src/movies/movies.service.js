const { default: knex } = require("knex");
const db = require("../db/connection");

const isShowing = require("../utils/is-showing.js");

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
    .modify(isShowing, is_showing);
}

async function read(movie_id) {
  return await db("movies as m")
    .select(COLUMNS)
    .where({ movie_id })
    .then((package) => package[0]);
}

module.exports = {
  list,
  read,
};
