if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

//ERORR HANDLERS
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json()); // enabling json handling

//ROUTE HANDLERS
app.use("/movies", moviesRouter);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
