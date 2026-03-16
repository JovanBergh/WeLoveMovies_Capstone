const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { movieExists } = require("../movies/movies.controller");

function fetchMovie (res) {
  return res?.locals?.movie?.id || null;
} 

async function list(req, res) {
  const movie_id = fetchMovie(res);
  console.log("id:" + movie_id);

  const data = await service.list(movie_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
