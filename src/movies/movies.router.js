const router = require("express").Router();
const controller = require("./movies.controller");

//ERROR HANDLERS
const methodNotAllowed = require("../errors/methodNotAllowed");

//EXTERNAL ROUTES
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

//COMPOUND ROUTES
router.use("/:movieId",controller.check); //ID check
router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);

//MAIN ROUTES
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
