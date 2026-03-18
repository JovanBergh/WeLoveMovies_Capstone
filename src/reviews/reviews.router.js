const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");
const corsOptions = require("../errors/corsOptions");
const cors = require("cors");

const permissions = cors(corsOptions("REVIEWS"));

// MAIN ROUTES
router
  .route("/")
  .options(permissions)
  .get(permissions, controller.list)
  .all(methodNotAllowed);
router
  .route("/:reviewId")
  .options(permissions)
  .put(permissions, controller.update)
  .delete(permissions, controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
