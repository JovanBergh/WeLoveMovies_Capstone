require("dotenv").config();

const cors = require("cors");
const { CORS_REVIEWS, CORS_THEATERS, CORS_MOVIES = "GET" } = process.env;

function corsOptions (route) {
    const origin = process.env.CORS_ORIGIN;

    const raw = process.env[`CORS_${route}`];
    const methods = raw && raw.length > 0
        ? raw.split(",").map(m => m.trim()).filter(Boolean)
        : ["GET"];

    return {
        origin,
        methods 
    }
};

module.exports = corsOptions;