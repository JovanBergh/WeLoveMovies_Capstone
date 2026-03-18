const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const corsOptions  = require("../errors/corsOptions ");
const cors = require("cors");

const permissions = cors(corsOptions("THEATERS"));

//ERROR HANDLERS
const methodNotAllowed = require("../errors/methodNotAllowed");

//MAIN ROUTES
router.route("/").options(permissions).get(permissions, controller.list).all(methodNotAllowed);

module.exports = router;
