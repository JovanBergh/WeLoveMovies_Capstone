const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");
const isExistingItem = require("../utils/is-existing-item");

const doesreviewExists = isExistingItem(service.read, "Review");

async function destroy(req, res) {
  const review_id = req.params.reviewId;
  await service.destroy(review_id);
  res.sendStatus(204);
}

async function list(req, res) {
  const { movie_id } = res.locals.movie;
  const data = await service.list(movie_id);
  res.json({ data });
}

function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function update(req, res) {
  const newReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: req.params.reviewId,
  };
  data = await service.update(newReview);

  res.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(doesreviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [
    hasMovieIdInPath,
    asyncErrorBoundary(list)
  ],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(doesreviewExists),
    asyncErrorBoundary(update),
  ],
};
