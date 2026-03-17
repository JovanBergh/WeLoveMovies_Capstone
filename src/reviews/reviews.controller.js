const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");
const isExistingItem = require("../utils/is-existing-item");

const doesreviewExists = isExistingItem(service.read, "Review");

async function destroy(request, response) {
  // TODO: Write your code here

}

async function list(request, response) {
  // TODO: Write your code here
  const { movie_id } = response.locals.movie;
  const data = await service.list(movie_id); 
  response.json({ data });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here

}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(doesreviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(doesreviewExists),
    asyncErrorBoundary(update),
  ],
};
