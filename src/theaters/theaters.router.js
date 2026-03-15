const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//MAIN ROUTES
router.route("/").all(methodNotAllowed);

module.exports = router;
