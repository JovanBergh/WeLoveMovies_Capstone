const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const { movies, theaters, mt } = require("../db/keys");

const reduceMovies = reduceProperties("theater_id", {
  id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  show_created: ["movies", null, "created_at"],
  show_updated: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
});

const buildResponse = function (queryBuilder, movie_id) {

  queryBuilder.select(...theaters.slice(0,-2), ...mt.slice(2,-1)); //building response

  if (movie_id) {
    queryBuilder
      .select("mt.is_showing")
      .where({
      "mt.movie_id": movie_id,
      "mt.is_showing": true,
    });
  } else {
    queryBuilder
      .select(
        ...theaters.slice(-2),
        ...movies,
        "mt.created_at as show_created",
        "mt.updated_at as show_updated",
        "mt.is_showing",
        "mt.theater_id"
      )
      .where({ "mt.is_showing": true });
  }
};

async function list(movie_id) {

  return db("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .modify(buildResponse, movie_id)
    .then((response) => {
      if (movie_id) {
        return response;
      }
      return reduceMovies(response);
    });

}

module.exports = {
  list,
};
