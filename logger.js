const pino = require("pino");
const pinoHttp = require("pino-http");
const crypto = require("crypto");


//LOGGERS

const logger = () => {
    
  //Formatting for terminals
  const setTransport = NODE_ENV === "development" && process.stdout.isTTY ?
    {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    } : '' ;

    return pino({
        transport: setTransport
    });

}; // Parent

const httpLogger = () => { // HTTP Child
  
  //Setting serializer

  const setSerializer = serializers[LOG_LEVEL]; 
  const setSuccessMessage =  customSuccessMessage[LOG_LEVEL]
    const setParentLogger = logger(); 
  return pinoHttp({
    logger: setParentLogger,
    genReqId: (request) => request.headers["x-request-id"] || crypto.randomUUID(),
    level: LOG_LEVEL,
    serializers: setSerializer,
    customSuccessMessage: setSuccessMessage,
    customAttributeKeys
})};

//CONFIGURATIONS
VALID_LEVELS = [
  "trace",
  "debug",
  "info",
  "success",
  "warning",
  "error",
  "fatal",
];


const { NODE_ENV = "development" } = process.env;
const { LOG_LEVEL = "info" } = process.env;


const customAttributeKeys = {
  req: 'request',
  res: 'response',
};

const serializers = {
  info: {
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
  }},
};


const customSuccessMessage = {
  info:  (req,res) => {return `\n(${res.statusCode}) ${req.method} "${req.url}"`},
};

module.exports = { logger, httpLogger };
