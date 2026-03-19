const pinoHttp = require("pino-http");
const { nanoid } = require("nanoid");

const level = process.env.LOG_LEVEL || "info";

const nodeEnv = process.env.NODE_ENV || "development";

//DEV: HUMAN-READABLE OUTPUT
const transport = 
  process.stdout.isTTY && nodeEnv === "development"
  ? {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  } : '' ;

const serializers = {
  req(req) {
    return {
      id: req.id,
      path: req.url,
      origin: req.remoteAddress,
      port: req.remotePort,
    }
  },
  res(res) {
    return {
      allowed : res.headers["access-control-allow-origin"],
      type: res.headers["content-type"],
  }
},

};

const customSuccessMessage = (req,res) => {
  return `\n${req.method} "${req.url}"\n${res.statusCode}`
}

const logger = pinoHttp({
  genReqId: (request) => request.headers["x-request-id"] || nanoid(),
  level,
  transport,
  serializers,
  customSuccessMessage
});

module.exports = logger;
