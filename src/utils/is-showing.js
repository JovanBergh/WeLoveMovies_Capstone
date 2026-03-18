function isShowing(queryBuilder, is_showing) {
  if (is_showing) {
    queryBuilder
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id");
  }
}

module.exports = isShowing;
