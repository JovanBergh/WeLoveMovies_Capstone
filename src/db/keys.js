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
  "mt.theater_id as t_id",
  "mt.is_showing",
  "mt.created_at as created",
  "mt.update_at as updated",
];

module.exports = {
    mt: JOIN_KEYS,
    movies: MOVIE_KEYS,
    theaters: THEATER_KEYS,
}