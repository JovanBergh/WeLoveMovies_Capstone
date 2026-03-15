const db = require("../db/connection");

const isShowing = require("../utils/is-showing.js");

const { movies } = require("../db/keys.js");


async function list(is_showing) {
  return db("movies as m")
    .select(movies)
    .modify(isShowing, is_showing);
}

async function read(movie_id) {
  return await db("movies as m")
    .select(movies)
    .where({ movie_id })
    .then((package) => package[0]);
}

module.exports = {
  list,
  read,
};
