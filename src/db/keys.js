const MOVIE_KEYS = [
  "m.movie_id as id",
  "m.title",
  "m.runtime_in_minutes",
  "m.rating",
  "m.description",
  "m.image_url",
  "m.created_at",
  "m.updated_at"
];

THEATER_KEYS = [
  "t.theater_id",
  "t.name",
  "t.address_line_1",
  "t.address_line_2",
  "t.city",
  "t.state",
  "t.zip",
  "t.created_at",
  "t.updated_at", 
];

JOIN_KEYS = [
  "mt.theater_id",
  "mt.movie_id",
  "mt.created_at",
  "mt.updated_at",
  "mt.is_showing",
];

module.exports = {
    mt: JOIN_KEYS,
    movies: MOVIE_KEYS,
    theaters: THEATER_KEYS,
}