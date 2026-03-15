const db = require("../db/connection");

async function list(is_showing) {
  return db("movies as m")
    .select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
    )
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters as mt",
            "m.movie_id",
            "mt.movie_id"
          )
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id");
      }
    });
}

async function read(movie_id) {
  // TODO: Add your code here
  
}

module.exports = {
  list,
  read,
};
