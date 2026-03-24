//INITIATING APP

//const logsRouter = require("./logs/logs.router");
const express = require("express");
const app = express();



try{
    const { httpLogger }  = require("../logger");
    app.use(httpLogger());
//app.use("/api/logs", logsRouter);
} finally {


app.use(express.json()); // enabling json handling

//ROUTES
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");


app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);



//ERORR HANDLERS
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(errorHandler);
app.use(notFound);

module.exports = app;
}