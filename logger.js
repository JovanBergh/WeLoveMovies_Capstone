const pinoHttp = require("pino-http");
const { nanoid } = require("nanoid");

const level = process.env.LOG_LEVEL || "info";

const nodeEnv = process.env.NODE_ENV || "development";
const transport = 
  process.stdout.isTTY && nodeEnv === "development"
  ? {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  } : '' ;

const logger = pinoHttp({
  genReqId: (request) => request.headers["x-request-id"] || nanoid(),
  level,
  transport
});

module.exports = logger;
