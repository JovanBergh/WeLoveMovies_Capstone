const MOVIE_KEYS = [
  "m.movie_id as id",
  "m.title",
  "m.runtime_in_minutes",
  "m.rating",
  "m.description",
  "m.image_url",
];

THEATER_KEYS = [
  "t.theater_id",
  "t.name",
  "t.address_line_1",
  "t.address_line_2",
  "t.city",
  "t.state",
  "t.zip" 
];

JOIN_KEYS = [
  "mt.is_showing",
  "mt.created_at",
  "mt.update_at",
];

module.exports = {
    join_mt: JOIN_KEYS,
    movies: MOVIE_KEYS,
    theaters: THEATER_KEYS,
}