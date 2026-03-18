const router = require("express").Router();
const controller = require("./movies.controller");
const corsOptions  = require("../errors/corsOptions ");
const cors = require("cors");

const permissions = cors(corsOptions("MOVIES"));

//ERROR HANDLERS
const methodNotAllowed = require("../errors/methodNotAllowed");
const notFound = require("../errors/notFound");

//EXTERNAL ROUTES
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

//COMPOUND ROUTES

router.use("/:movieId",controller.check); //ID check
router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);
router.use("/:movieId/critics", notFound);

//MAIN ROUTES
router.route("/").options(permissions).get(permissions, controller.list).all(methodNotAllowed);
router.route("/:movieId").options(permissions).get(permissions, controller.read).all(methodNotAllowed);

module.exports = router;
