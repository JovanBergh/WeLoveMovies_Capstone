const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// MAIN ROUTES
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
