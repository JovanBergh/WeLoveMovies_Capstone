const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  // TODO: Add your code here.

  next({});
}

async function read(req, res) {
  // TODO: Add your code here
  res.json({ data: "" });
}

async function list(req, res) {

  let is_showing = undefined;

  if (req.query.is_showing == "true") {
    is_showing = true;
  }

  res.json({ data: await service.list(is_showing) });
}// list

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
