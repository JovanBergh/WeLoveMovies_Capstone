const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const { movies, theaters, mt } = require("../db/keys");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies_theaters", null, "created"],
  updated_at: ["movies_theaters", null, "updated"],
  theater_id: ["movies_theaters", null, "t_id"],
});

const buildResponse = function (queryBuilder, movie_id) {

  queryBuilder.select(theaters, mt, ["m.movie_id"]); //building response

  if (movie_id) {
    queryBuilder.where({
      "m.movie_id": movie_id,
      "mt.is_showing": true,
    });
  } else {
    queryBuilder
      .select(movies.slice(1))
      .where({ "mt.is_showing": true })
      .groupBy("t.theater_id")
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
