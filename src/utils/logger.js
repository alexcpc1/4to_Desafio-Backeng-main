import winston from "winston";
import { config } from "../config/config.js";
import { __dirname } from "../utils.js";
import path from "path";


let logger;

const customLogger = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors:{
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        http: "cyan",
        debug: "gray"
    }
};

winston.addColors(customLogger.colors);

const devLogger = winston.createLogger({
    levels: customLogger.levels,
    transports: [
        new winston.transports.Console({level:"debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLogger.colors}),
                winston.format.simple()
            )
        })
    ]
});


const prodLogger = winston.createLogger({
    levels: customLogger.levels,
    transports: [
        new winston.transports.Console({level:"info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLogger.colors}),
                winston.format.simple()
            )
            }),
        new winston.transports.File({filename: path.join(__dirname, "/logs/errors.log"), level:"error",
            format: winston.format.combine(
                winston.format.colorize({colors: customLogger.colors}),
                winston.format.simple()
            )
        })
    ]
});


if (config.server.appEnv == "development") {
    logger = devLogger;
} else if (config.server.appEnv == "production") {
    logger = prodLogger;
};

export {logger}