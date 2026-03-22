const pinoHttp = require("pino-http");
const { nanoid } = require("nanoid");


//CONFIGURATIONS
const level = process.env.LOG_LEVEL || "info";
const nodeEnv = process.env.NODE_ENV || "development";

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

//LOGGERS
const logger = (level) => {

  //Formatting for terminals
  const transport = nodeEnv === "development" && process.stdout.isTTY ?
    {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    } : '' ;
  
  //Setting serializer
  const setSerializer = serializers[level]; 
  const setSuccessMessage =  customSuccessMessage[level]

  return pinoHttp({
    genReqId: (request) => request.headers["x-request-id"] || nanoid(),
    level: level,
    transport,
    serializers: setSerializer,
    customSuccessMessage: setSuccessMessage,
    customAttributeKeys
})};

/*TO DO: Separate application, auditing & security streams
const app = (level, transport, serializers) => {
  return pinoHttp({
  genReqId: (request) => request.headers["x-request-id"] || nanoid(),
  level,
  transport,
  serializers,
  customSuccessMessage,
  customAttributeKeys
})};

const audit = (level, transport, serializers) => {
  return pinoHttp({
  genReqId: (request) => request.headers["x-request-id"] || nanoid(),
  level,
  transport,
  serializers,
  customSuccessMessage,
  customAttributeKeys
})};

const security = (level, transport, serializers) => {
  return pinoHttp({
  genReqId: (request) => request.headers["x-request-id"] || nanoid(),
  level,
  transport,
  serializers,
  customSuccessMessage,
  customAttributeKeys
})};
*/
module.exports = {
  logger
};
