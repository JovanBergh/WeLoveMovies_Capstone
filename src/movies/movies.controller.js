const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const isExistingItem = require("../utils/is-existing-item");

const doesMovieExist = isExistingItem(service.read, "Movie");

function read(req, res) {
  res.json({ data: res.locals.movie });
} // read

function validate_is_showing(req, res, next) {
  const { is_showing = "empty" } = req.query;

  const log = req.log.child({id: req.id }, { serializers: {}});

  if (is_showing == "empty" || is_showing === "true" || is_showing == "false") {
    log.info(    
      {
        query: "is_showing",
        received: is_showing,
      },
      "is_showing validation: passed");
    return next();
  }

  log.error(      
    {
      query: "is_showing",
      received: is_showing,
    },
    "Invalid argument provided");
  return next({
    status: 404,
    message: "Unexpected value received for is_showing",
  });
}

async function list(req, res) {
  const is_showing = req.query.is_showing;
  const log = req.log.child({
    action: "list",
  });

  res.json({ data: await service.list(is_showing) });
} // list

module.exports = {
  list: [asyncErrorBoundary(validate_is_showing), asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(doesMovieExist), read],
  check: doesMovieExist,
};
