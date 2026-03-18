const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

require("dotenv").config();

//INITIATING APP
const express = require("express");
const app = express();

app.use(express.json()); // enabling json handling

//ROUTE HANDLERS
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

//ERORR HANDLERS
app.use(errorHandler);
app.use(notFound);

module.exports = app;
