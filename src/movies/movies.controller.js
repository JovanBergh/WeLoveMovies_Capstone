const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const data = await service.read(movieId);

  if (data) {
    res.locals.movie = data;
    return next();
  }

  return next({
    status: 404,
    message: `Error: ${movieId} Not Found`,
  });
} // movieExists

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
  read: [asyncErrorBoundary(movieExists), read],
};
