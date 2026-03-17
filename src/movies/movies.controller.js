const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const isExistingItem = require("../utils/is-existing-item");

const doesMovieExist = isExistingItem(service.read, "Movie");

function read(req, res) {
  res.json({ data: res.locals.movie });
} // read

async function list(req, res) {
  let is_showing = undefined;

  if (req.query.is_showing == "true") {
    is_showing = true;
  }

  res.json({ data: await service.list(is_showing) });
} // list

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(doesMovieExist), read],
  check: doesMovieExist
};
