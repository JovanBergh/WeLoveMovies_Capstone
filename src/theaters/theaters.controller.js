const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  console.log()
  res.json({ });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
