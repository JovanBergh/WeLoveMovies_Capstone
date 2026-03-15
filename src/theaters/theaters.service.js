const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

COLUMNS = [
  "t.theater_id",
  "t.name",
  "t.address_line_1",
  "t.address_line_2",
  "t.city",
  "t.state",
  "t.zip" 
]

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

async function list(movie_id) {
  return db("theaters as t")
    .join(
      "movies_theaters as mt",
      "mt.theater_id",
      "t.theater_id"
    )
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .modify((queryBuilder) => {
      if(movie_id) {
        queryBuilder.select(
          COLUMNS,
          "mt.is_showing",
          "mt.created_at",
          "mt.update_at",
          "m.movie_id"
        )
        .where({ 
          "m.movie_id": movie_id,
          "mt.is_showing": true 
          })
      }
      else {
        queryBuilder.select(
          COLUMNS,
          "t.created_at",
          "t.updated_at",
          "m.movie_id",
          "m.title",
          "m.runtime_in_minutes",
          "m.rating",
          "m.description",
          "m.image_url",
          "m.created_at",
          "m.updated_at",
          "mt.is_showing",
          "mt.theater_id"
        )
        .where({ "mt.is_showing": true })
        .groupBy("t.theater_id")
        .then(reduceMovies);
      }
    })
}

module.exports = {
  list,
};
